
define [
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	
], ( Backbone, mediator, SimilarsCollection, proxy )->

	'use strict'

	class ItemModel extends Backbone.Model

		###
			 artist
			 title

			 info:
				 album
				 tags
				 wiki
 				 images
 				 loaded

			 audio:
				 aid:
				 oid:
				 url
				 duration

			 id
			 selected
		 ###

		defaults:
			type: 'item'
			selected: false
			has_info: false


		initialize: ( attributes, options )->
			@similarsCollection = new SimilarsCollection()
			@similarsCollection.setParent( this )


		getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )
					@set( 'has_info', true )


		fetch: ()->
			#todo??
			if not @get( 'has_info' )
				@getTrackInfo() 
			
			@similarsCollection.getFirstSimilars()


		select: ( selected )->
			@set( 'selected', selected )


		play: ()->
			mediator.publish( 'player:play', this )
			mediator.publish( 'list:current', this )






