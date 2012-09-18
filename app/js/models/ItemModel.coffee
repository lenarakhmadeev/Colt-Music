
define [
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	
], ( Backbone, mediator, SimilarsCollection, proxy )->
	
	class ItemModel extends Backbone.Model

		defaults:
			type: 'item'
			has_info: false


		initialize: ( attributes, options )->
			@similarsCollection = new SimilarsCollection()
			@similarsCollection.setParent( this )


		getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( data )
					@set( 'has_info', true )


		fetch: ()->
			#todo??
			if not @get( 'has_info' )
				@getTrackInfo() 
			
			@similarsCollection.getFirstSimilars()


		select: ( selected )->
			@trigger( 'select', selected )


		play: ()->
			mediator.publish( 'player:play', this )
			mediator.publish( 'list:current', this )






