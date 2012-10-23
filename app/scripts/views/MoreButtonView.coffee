
define ( require )->
	View = require( 'views/View' )
	moreTemplate = require( 'tpl!templates/more.html' )

	'use strict'

	class MoreButtonView extends View

		template: moreTemplate

		className: 'b-more-button'

		events:
			'click .b-more-button__show-more-button': 'getMoreSimilars'


		initialize: ( options )->
			@collection.own.on( 'change:status', @render, this )


		serialize: ()->
			status: @collection.own.get( 'status' )


		getMoreSimilars: ()->
			@collection.getMoreSimilars()