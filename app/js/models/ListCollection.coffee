
define [
	'models/Collection'
	'models/ItemModel'
	'services/mediator'
	'services/proxy/proxy'

], ( Collection, ItemModel, mediator, proxy )->

	'use strict'

	class ListCollection extends Collection

		model: ItemModel

		initialize: ( models, options )->
			@own.set
				page: 0
				loaded: false

			@bind( 'reset', @collectionReset, this )

			mediator.subscribe( 'load:page', @loadPage, this )


		getAudio: ()->
			#todo при обновлении не ресет а адд
			proxy.getAudioList()
				.done ( data )=>
					@reset( data )


		collectionReset: ()->
			@own.set( 'loaded', true )
			@loadPage( @own.get( 'page' ) )


		loadPage: ( page )->
			@own.set( 'page', page )

			if @own.get( 'loaded' )
				@own.set( 'content', @getPage( page ) )


		pageSize: 5


		getPage: ( page )->
			start = page * @pageSize
			end = ( page + 1 ) * @pageSize
			@[start...end]


		pagesCount: ()->
			Math.ceil( @length / @pageSize )






