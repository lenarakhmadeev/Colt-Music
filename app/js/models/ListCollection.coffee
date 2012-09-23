
define [
	'underscore'
	'models/Collection'
	'models/ItemModel'
	'services/mediator'
	'services/proxy/proxy'

], ( _, Collection, ItemModel, mediator, proxy )->

	'use strict'

	class ListCollection extends Collection

		model: ItemModel

		initialize: ( models, options )->
			@own.set
				page: 0

			@bind( 'reset', @firstLoad, this )

			mediator.subscribe( 'load:page', @loadPage, this )


		getAudio: ()->
			#todo при обновлении не ресет а адд
			proxy.getAudioList()
				.done ( data )=>
					@reset( data )


		firstLoad: ()->
			@loadPage( @own.get( 'page' ) )
			@playFirst()


		playFirst: ()->
			firstPlay = @getFirstPlay()
			mediator.publish( 'list:current', firstPlay )
			mediator.publish( 'player:play', firstPlay )
			mediator.publish( 'player:pause')


		getFirstPlay: ()->
			@own.get( 'content' )[ 0 ]


		loadPage: ( page )->
			@preloadPage( page )
			@_loadPage( page )

			@preloadPage( page + 1 )


		_loadPage: ( page )->
			@own.set( 'page', page )
			@own.set( 'content', @getPage( page ) )


		preloadPage: ( page )->
			content = @getPage( page )
			@fetchContent( content )


		fetchContent: ( content )->
			_.each( content, @fetchItem, this )


		fetchItem: ( item )->
			item.fetch()


		pageSize: 5
		getPage: ( page )->
			start = page * @pageSize
			end = ( page + 1 ) * @pageSize
			@[start...end]


		pagesCount: ()->
			Math.ceil( @length / @pageSize )

		nextPage: ()->
			@loadPage( @own.get( 'page' ) + 1 )


		prevPage: ()->
			@loadPage( @own.get( 'page' ) - 1 )