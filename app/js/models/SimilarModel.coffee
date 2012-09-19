
define [
	'jquery'
	'underscore'
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	
], ( $, _, Backbone, mediator, SimilarsCollection, proxy )->
	
	class SimilarModel extends Backbone.Model

		defaults:
			type: 'similar'
			selected: false


		getTrackInfo: ()->
			@_getTrackInfo() if not @has( 'info' )


		_getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )


		getAudioUrl: ()->
			dfd = new $.Deferred()

			if @has( 'audio' )
				dfd.resolve()

			@_getAudioUrl()
				.done ()->
					dfd.resolve()

			dfd.promise()


		_getAudioUrl: ()->
			proxy.getAudioUrl( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( audio: data )


		select: ( selected )->
			@set( 'selected', selected )


		play: ()->
			@getAudioUrl()
				.done ()=>
					mediator.publish( 'player:play', this )
					mediator.publish( 'list:current', this )







