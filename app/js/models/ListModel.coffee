
define [
	'backbone'
	'services/mediator'
	'models/ListCollection'
	
], ( Backbone, mediator, ListCollection )->

	class ListModel extends Backbone.Model

		defaults:
			page: 0
			loaded: false

		pageSize: 5

		initialize: ( attributes, options )->
			@listCollection = new ListCollection()
			@listCollection.bind( 'reset', @collectionReset, this )

			mediator.subscribe( 'load:page', @loadPage, this )


		getAudio: ()->
			@listCollection.getAudio()


		collectionReset: ()->
			@set( 'loaded', true )
			@loadPage( @get( 'page' ) )


		loadPage: ( page )->
			@set( 'page', page )

			if @get( 'loaded' )
				@set( 'content', @getPage( page ) )
			

		getPage: ( page )->
			start = page * @pageSize
			end = ( page + 1 ) * @pageSize
			@listCollection[start...end]


		pagesCount: ()->
			Math.ceil( @listCollection.length / @pageSize )

