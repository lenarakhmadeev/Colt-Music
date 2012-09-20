
define [
	'underscore'
	'views/View'
	'views/ItemView'
	'views/NavigationView'
	
], ( _, View, ItemView, NavigationView )->

	'use strict'

	class ListView extends View

		className: 'ListCont'

		initialize: ( options )->
			@model.bind( 'change:content', @render, this )

			@navigationView = new NavigationView( model: @model )


		_render: ()->
			@renderNavigation()
			@renderItems()


		renderNavigation: ()->
			@navigationView.render()
			@append( @navigationView )


		renderItems: ()->
			content = @model.get( 'content' )
			_.each( content, @addItem, this )


		addItem: ( model )->
			model.fetch()

			itemView = new ItemView( model: model )
			itemView.render()

			@append( itemView )

