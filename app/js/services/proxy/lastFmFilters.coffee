
define [


], ()->

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



	lastFmFilters =

		info: ( data )->
			album: keypath( data, 'track.album.title' )
			images: filterImages( keypath( data, 'track.album.image' ) )
			tags: filterTags( data )
			wiki: keypath( data, 'track.wiki' ) # todo посмотреть подробнее


		similar: ( data )->
			temp = keypath( data, 'similartracks.track' )
			if _.isString( temp )
				return []

			tracks = if _.isArray(temp) then temp else [ temp ]

			_.map( tracks, filterSim )


		topTracks: ()->


