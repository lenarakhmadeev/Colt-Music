
define [
	'backbone'
	'models/TrackModel'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	'backbone_nested'
	
], ( Backbone, TrackModel, mediator, SimilarsCollection, proxy )->

	'use strict'

	class ItemModel extends TrackModel

		defaults:
			artist: null
			title: null

			selected: false
			played: false

			type: 'item'
			has_info: false
			has_audio: true

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


		initialize: ( attributes, options )->
			@similarsCollection = new SimilarsCollection()
			@similarsCollection.setParent( this )


		fetch: ()->
			unless @get( 'has_info' )
				@getTrackInfo() 
			
			@similarsCollection.getFirstSimilars()
