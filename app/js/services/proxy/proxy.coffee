
define [
	'jquery'
	'module'
	'underscore'
	'services/proxy/lastFm'
	'vk'
], ( $, module, _, LastFm, vk )->

	'use strict'

	keypath = ( object, keypath, _default = null )->
		keypath = if _.isNumber( keypath ) then '' + keypath else keypath
		keys = if _.isString( keypath ) then keypath.split( "." ) else keypath
		result = object
		for key in keys
			if _.isObject( result ) and key of result
				result = result[ key ]
			else
				result = _default
				break

		result







	keyOrPluck = ( data, key )->
		# переделать
		if data == null
			return null

		if _.isArray( data )
			_.pluck( data, key )
		else
			[ data[ key ] ]

	filterTags = ( data )->
		tags = keypath( data, 'track.toptags.tag', {} )
		keyOrPluck( tags, 'name' ) || null

	filterImages = (data)->
		result = {}

		for image in data
			result[image.size] = image['#text']

		result


	filterSim = ( data )->
		artist: keypath( data, 'artist.name' )
		title: keypath( data, 'name' )
		images: filterImages( keypath( data, 'image' ) )


	infoFilter = ( data )->
		album: keypath( data, 'track.album.title' )
		images: filterImages( keypath( data, 'track.album.image' ) )
		tags: filterTags( data )
		wiki: keypath( data, 'track.wiki' ) # todo посмотреть подробнее

	similarFilter = ( data )->
		temp = keypath( data, 'similartracks.track' )
		if _.isString( temp )
			return []

		tracks = if _.isArray(temp) then temp else [ temp ]

		_.map( tracks, filterSim )

	searchAudioFilter = ( data )->
		data.slice( 1 )


	audioItemFilter = ( data )->
		result = _.pick( data, 'artist', 'title' )
		result.audio = _.pick( data, 'aid', 'owner_id', 'url', 'duration' )

		result


	getAudioFilter = ( data )->
		console.log 'dataFilter.getAudio', arguments

		_.map( data, audioItemFilter )












	class Proxy

		constructor: (@lastFm, @vk)->

		getTrackInfo: (artist, title)=>
			dfd = new $.Deferred()

			@lastFm.getTrackInfo(artist, title)
				.done (data, textStatus, jqXHR)=>
					if 'error' of data
						dfd.reject(data.message)
					else
						dfd.resolve(infoFilter(data))

				.error (jqXHR, textStatus, message)->
					dfd.reject(message)

			dfd.promise()


		getSimilarTracks: ( artist, title, offset, count )->
			dfd = new $.Deferred()

			@lastFm.getSimilarTracks( artist, title, offset + count )
				.done ( data, textStatus, jqXHR )->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = similarFilter( data )[ offset... ]
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message )->
					dfd.reject( message )

			dfd.promise()


		getArtistTopTracks: (artist, offset, count)=>
			dfd = new $.Deferred()

			@lastfmApi.getArtistTopTracks(artist, 1, offset + count)
				.done (data, textStatus, jqXHR)=>
					if 'error' of data
						dfd.reject(data.message)
					else
						result = topTracksFilter(data)[offset...]
						dfd.resolve(result)

				.error (jqXHR, textStatus, message)->
					dfd.reject(message)

			dfd.promise()


		searchAudio: (artist, title, offset, count)=>
			dfd = new $.Deferred()

			params =
				q: "#{artist} - #{title}"
				sort: 2
				auto_complete: 1
				count: count
				offset: offset

			@vk.api 'audio.search', params, (data)->
				if 'error' of data
					dfd.reject( data.error )
				else
					result = searchAudioFilter( data.response )
					dfd.resolve( result )

			dfd.promise()


		getAudioUrl: ( artist, title )->
			dfd = new $.Deferred()

			@searchAudio( artist, title, 0, 1 )
				.done ( data )->
					audio = _.pick( data[0], 'aid', 'owner_id', 'url', 'duration' )
					dfd.resolve( audio )

				.fail ()->
					dfd.reject( arguments... )

			dfd.promise()


		addToWall: (audio_id, owner_id)=>
			dfd = new $.Deferred()

			params =
				attachments: "audio#{owner_id}_#{audio_id}"

			@vk.api 'audio.add', params, (data)->
				if keypath(data, 'error')?
					dfd.reject(data.error_msg)
				else
					dfd.resolve(data.response)

			dfd.promise()


		addToAudio: (audio_id, owner_id)=>
			dfd = new $.Deferred()

			params =
				aid: audio_id
				oid: owner_id

			@vk.api 'audio.add', params, (data)->
				if keypath(data, 'error')?
					dfd.reject(data.error_msg)
				else
					dfd.resolve(data.response)

			dfd.promise()



		getAudioList: ()->
			dfd = new $.Deferred()

			@vk.api 'audio.get', {}, (data)->
				if 'error' of data
					dfd.reject( data.error )
				else
					dfd.resolve( getAudioFilter(data.response) )

			dfd.promise()

			


	#--------------------------------------------------------
	config = module.config()
	lastFm = new LastFm(config.lastFm_key, config.lastFm_url)

	proxy = new Proxy(lastFm, vk)