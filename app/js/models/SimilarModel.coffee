
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







