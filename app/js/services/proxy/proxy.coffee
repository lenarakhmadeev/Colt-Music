
define [
	'jquery'
	'module'
	'underscore'
	'services/proxy/LastFm'
	'services/proxy/lastFmFilters'
	'vk'
	'services/proxy/vkFilters'

], ( $, module, _, LastFm, lastFmFilters, vk, vkFilters )->

	'use strict'

	class Proxy

		constructor: ( @lastFm, @vk )->

		getTrackInfo: ( artist, title )->
			dfd = new $.Deferred()

			@lastFm.getTrackInfo( artist, title )
				.done ( data, textStatus, jqXHR )->
					if 'error' of data
						dfd.reject( data.message )
					else
						dfd.resolve( lastFmFilters.info( data ) )

				.error ( jqXHR, textStatus, message )->
					dfd.reject( message )

			dfd.promise()


		getSimilarTracks: ( artist, title, offset, count )->
			dfd = new $.Deferred()

			@lastFm.getSimilarTracks( artist, title, offset + count )
				.done ( data, textStatus, jqXHR )->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = lastFmFilters.similar( data )[ offset... ]
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message )->
					dfd.reject( message )

			dfd.promise()


		getArtistTopTracks: ( artist, offset, count )->
			dfd = new $.Deferred()

			@lastfmApi.getArtistTopTracks( artist, 1, offset + count )
				.done ( data, textStatus, jqXHR )->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = lastFmFilters.topTracks( data )[ offset... ]
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message )->
					dfd.reject( message )

			dfd.promise()


		searchAudio: ( artist, title, offset, count )->
			dfd = new $.Deferred()

			params =
				q: "#{ artist } - #{ title }"
				sort: 2
				auto_complete: 1
				count: count
				offset: offset

			@vk.api 'audio.search', params, ( data )->
				if 'error' of data
					dfd.reject( data.error )
				else
					result = vkFilters.searchAudio( data.response )
					dfd.resolve( result )

			dfd.promise()


		getAudioUrl: ( artist, title )->
			dfd = new $.Deferred()

			@searchAudio( artist, title, 0, 1 )
				.done ( data )->
					audio = _.pick( data[ 0 ], 'aid', 'owner_id', 'url', 'duration' )
					dfd.resolve( audio )

				.fail ()->
					dfd.reject( arguments... )

			dfd.promise()


		addToWall: ( audio_id, owner_id )->
			dfd = new $.Deferred()

			params =
				attachments: "audio#{ owner_id }_#{ audio_id }"

			@vk.api 'audio.add', params, ( data )->
				if keypath( data, 'error' )?
					dfd.reject( data.error_msg )
				else
					dfd.resolve( data.response )

			dfd.promise()


		addToAudio: (audio_id, owner_id)->
			dfd = new $.Deferred()

			params =
				aid: audio_id
				oid: owner_id

			@vk.api 'audio.add', params, ( data )->
				if keypath( data, 'error' )?
					dfd.reject( data.error_msg )
				else
					dfd.resolve( data.response )

			dfd.promise()



		getAudioList: ()->
			dfd = new $.Deferred()

			@vk.api 'audio.get', {}, (data)->
				if 'error' of data
					dfd.reject( data.error )
				else
					dfd.resolve( vkFilters.getAudio( data.response ) )

			dfd.promise()

			


	#--------------------------------------------------------
	config = module.config()
	lastFm = new LastFm( config.lastFm_key, config.lastFm_url )

	proxy = new Proxy( lastFm, vk )