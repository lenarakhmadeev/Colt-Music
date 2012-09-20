
define [
	'views/View'
	'tpl!templates/similar.html'
	
], ( View, similarTemplate )->

	'use strict'

	class SimilarView extends View

		template: similarTemplate

		className: 'SimItem'

		events:
			'click .SimPlayB, .SmallImg' : 'play'


		initialize: ( options )->
			@model.bind( 'change:selected', @renderSelected, this )


		renderSelected: ()->
			if @model.get ( 'selected' )
				@$el.addClass( 'selected' )
			else
				@$el.removeClass( 'selected' )


		play: ()->
			@model.play()

		showWiki: ()=>

		addToAudio: ()=>

		addToWall: ()=>
