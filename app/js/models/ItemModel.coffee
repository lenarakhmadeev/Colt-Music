
define [
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	'backbone_nested'
	
], ( Backbone, mediator, SimilarsCollection, proxy )->

	'use strict'

	class ItemModel extends Backbone.NestedModel

		defaults:
			artist: null
			title: null
			selected: false
			type: 'item'
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


		initialize: ( attributes, options )->
			@similarsCollection = new SimilarsCollection()
			@similarsCollection.setParent( this )


		getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )
					@set( 'has_info', true )


		fetch: ()->
			unless @get( 'has_info' )
				@getTrackInfo() 
			
			@similarsCollection.getFirstSimilars()


		select: ( selected )->
			@set( 'selected', selected )


		play: ()->
			mediator.publish( 'player:play', this )
			mediator.publish( 'list:current', this )


		addToWall: ()->
			proxy.addToWall( @get( 'audio.aid' ), @get( 'audio.owner_id' ) )


