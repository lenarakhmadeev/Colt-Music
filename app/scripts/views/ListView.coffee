
define ( require )->
	_ = require( 'underscore' )
	vk = require( 'vk' )
	mediator = require( 'services/mediator' )
	View = require( 'views/View' )
	ItemView = require( 'views/ItemView' )
	NavigationView = require( 'views/NavigationView' )

	'use strict'

	class ListView extends View

		className: 'b-list'

		initialize: ( options )->
			@collection.own.on( 'change:content', @render, this )


		_render: ()->
			vk.callMethod( 'scrollWindow', 0, 0 )

			content = @collection.own.get( 'content' )
			_.each( content, @addItem, this )

			mediator.publish( 'app:resize' )


		addItem: ( model )->
			itemView = new ItemView( model: model )
			itemView.render()

			@append( itemView )

