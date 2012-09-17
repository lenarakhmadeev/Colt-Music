
define [
	'views/View'
	'tpl!templates/similar.html'
	
], (View, similarTemplate)->

	class SimilarView extends View

		template: similarTemplate

		className: 'SimItem'

		events:
			'click .SimPlayB' : 'play'


		initialize: (options)->
			@model.bind( 'select', @renderSelected, this )


		renderSelected: (selected)->
			if selected
				@$el.addClass( 'selected' )
			else
				@$el.removeClass( 'selected' )
			

		play: ()->
			@model.play()

		showWiki: ()=>

		addToAudio: ()=>

		addToWall: ()=>
