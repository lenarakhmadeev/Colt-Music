
define [
	'views/View'
	'tpl!templates/more.html'

], (View, moreTemplate)->

	class MoreButtonView extends View

		template: moreTemplate

		tagName: 'span'

		className: 'MoreButton'


		initialize: (options)->
			@collection.bind( 'own:change:status', @render, this )


		serialize: ()->
			status: @collection.own.get( 'status' )

