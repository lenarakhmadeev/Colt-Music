
define [
	'jquery'
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	'backbone_nested'
	
], ( $, Backbone, mediator, SimilarsCollection, proxy )->

	'use strict'

	class SimilarModel extends Backbone.NestedModel

		defaults:
			artist: null
			title: null
			selected: false
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
				aid: null
				owner_id: null
				duration: null


		getTrackInfo: ()->
			@_getTrackInfo() unless @get( 'has_info' )


		_getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )

				.always ()=>
					@set( 'has_info', true )


		getAudioUrl: ()->
			dfd = new $.Deferred()

			if @get( 'has_audio' )
				dfd.resolve()

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


		select: ( selected )->
			@set( 'selected', selected )


		play: ()->
			@getAudioUrl().done( @_play )


		_play: ()=>
			mediator.publish( 'player:play', this )
			mediator.publish( 'list:current', this )


		addToAudio: ()->
			@getAudioUrl().done( @_addToAudio )


		_addToAudio: ()=>
			# todo обновлять список, информировать пользователя
			proxy.addToAudio( @get( 'audio.aid' ), @get( 'audio.owner_id' ) )


		addToWall: ()->
			@getAudioUrl().done( @_addToWall )


		_addToWall: ()=>
			# todo расшарить друзьям или еще кому
			proxy.addToWall( @get( 'audio.aid' ), @get( 'audio.owner_id' ) )





