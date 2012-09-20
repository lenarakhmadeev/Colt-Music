
define [
	'underscore'
	'views/View'
	'tpl!templates/similar.html'
	
], ( _, View, similarTemplate )->

	'use strict'

	class SimilarView extends View

		template: similarTemplate

		className: 'SimItem'

		events:
			'click .SimPlayB, .SmallImg' : 'play'


		initialize: ( options )->
			@model.bind( 'change:selected', @renderSelected, this )


		serialize: ()->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )
			cover: @model.get( 'info.images.medium' ) or 'http://placekitten.com/g/64/64'


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
