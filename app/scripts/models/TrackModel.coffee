
define [
	'jquery'
	'backbone'
	'services/mediator'
	'services/proxy/proxy'
	'backbone_nested'

], ( $, Backbone, mediator, proxy )->

	'use strict'

	class TrackModel extends Backbone.NestedModel

		defaults:
			artist: null
			title: null

			selected: false
			played: false

			type: 'similar'
			has_info: false
			has_audio: false

			info:
				wiki: null
				album: null
				images: null
				tags: null

			audio:
				url: null
				audio_id: null
				owner_id: null
				duration: null


		getTrackInfo: ()->
			@_getTrackInfo() unless @get( 'has_info' )


		_getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )

				.fail ( error )->
					mediator.publish( 'logger:error', "getTrackInfo fail: #{ error.error_msg }" )

				.always ()=>
					@set( 'has_info', true )


		getAudioUrl: ()->
			dfd = new $.Deferred()

			if @get( 'has_audio' )
				dfd.resolve()
			else
				@_getAudioUrl()
					.done ()->
						dfd.resolve()

					.always ()=>
						@set( 'has_audio', true )

			dfd.promise()


		_getAudioUrl: ()->
			proxy.getAudioUrl( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( audio: data )

				.fail ( error )->
					mediator.publish( 'logger:user:error', 'Запись не найдена' )
					mediator.publish( 'logger:error', "getAudioUrl fail: #{ error.error_msg }" )


		setCurrent: ( current )->
			@setSelected( current )
			@setPlayed( current )


		setSelected: ( selected )->
			@set( 'selected', selected )


		setPlayed: ( played )->
			@set( 'played', played )


		play: ()->
			if @get( 'selected' )
				@resume()
			else
				@getAudioUrl().done( @_play )


		_play: ()=>
			@setCurrent( true )

			mediator.publish( 'player:play', this )
			mediator.publish( 'flow:current', this )


		pause: ()->
			@setPlayed( false )
			mediator.publish( 'player:pause' )


		resume: ()->
			@setPlayed( true )
			mediator.publish( 'player:resume' )


		togglePlay: ()->
			if @get( 'played' )
				@pause()
			else
				if @get( 'selected' )
					@resume()
				else
					@play()


		addToWall: ()->
			@getAudioUrl().done( @_addToWall )


		_addToWall: ()=>
			proxy.addToWall( @get( 'audio.audio_id' ), @get( 'audio.owner_id' ) )
				.done ()->
					mediator.publish( 'logger:user:success', 'Запись размещена на стене' )

				.fail ( error )->
					errorMessage = error.error_msg
					mediator.publish( 'logger:user:error', 'Запись не может быть размещена на стене: ' + errorMessage )
					mediator.publish( 'logger:error', "addToWall fail: #{ errorMessage }" )


		addToAudio: ()->
			@getAudioUrl().done( @_addToAudio )


		_addToAudio: ()=>
			proxy.addToAudio( @get( 'audio.audio_id' ), @get( 'audio.owner_id' ) )
				.done ( audio_id )=>
					mediator.publish( 'logger:user:success', 'Запись успешно добавлена' )

				.fail ( error )->
					errorMessage = error.error_msg
					mediator.publish( 'logger:user:error', 'Запись не может быть добавлена: ' + errorMessage )
					mediator.publish( 'logger:error', "addToAudio fail: #{ errorMessage }" )


