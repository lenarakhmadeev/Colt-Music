
define [
	'underscore'
	'services/mediator'
	'views/View'
	'views/ItemView'
	'views/NavigationView'
	
], ( _, mediator, View, ItemView, NavigationView )->

	'use strict'

	class ListView extends View

		className: 'b-list'

		initialize: ( options )->
			@collection.own.on( 'change:content', @render, this )


		_render: ()->
			content = @collection.own.get( 'content' )
			_.each( content, @addItem, this )

			mediator.publish( 'app:resize' )


		addItem: ( model )->
			itemView = new ItemView( model: model )
			itemView.render()

			@append( itemView )

