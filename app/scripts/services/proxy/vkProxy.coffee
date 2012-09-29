
define [
	'jquery'
	'vk'
	'services/proxy/vkFilters'

], ( $, vk, vkFilters )->

	'use strict'

	vkProxy =

		searchAudio: ( artist, title, offset, count )->
			dfd = new $.Deferred()

			params =
				q: "#{ artist } - #{ title }"
				sort: 2
				auto_complete: 1
				count: count
				offset: offset

			vk.api 'audio.search', params, ( data )->
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
					result = vkFilters.audioUrl( data )
					dfd.resolve( result )

				.fail ()->
					dfd.reject( arguments... )

			dfd.promise()


		addToWall: ( audio_id, owner_id )->
			dfd = new $.Deferred()

			params =
				attachments: "audio#{ owner_id }_#{ audio_id }"

			vk.api 'wall.post', params, ( data )->
				console.log 'post', data

				if 'error' of data
					dfd.reject( data.error )
				else
					dfd.resolve( data.response )

			dfd.promise()


		addToAudio: (audio_id, owner_id)->
			dfd = new $.Deferred()

			params =
				aid: audio_id
				oid: owner_id

			vk.api 'audio.add', params, ( data )->
				if 'error' of data
					dfd.reject( data.error )
				else
					dfd.resolve( data.response )

			dfd.promise()


		getAudioList: ()->
			dfd = new $.Deferred()

			vk.api 'audio.get', {}, (data)->
				if 'error' of data
					dfd.reject( data.error )
				else
					dfd.resolve( vkFilters.getAudio( data.response ) )

			dfd.promise()