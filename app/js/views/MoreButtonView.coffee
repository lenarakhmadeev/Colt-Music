
define [
	'views/View'
	'tpl!templates/more.html'

], (View, moreTemplate)->

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