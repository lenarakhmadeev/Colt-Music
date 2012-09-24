
define [
	'underscore'
	'views/View'
	'tpl!templates/similar.html'
	
], ( _, View, similarTemplate )->

	'use strict'

	class SimilarView extends View

		template: similarTemplate

		className: 'b-similar'

		events:
			'click .b-similar__play-button' : 'play'
			'click .b-similar__pause-button': 'pause'
			'click .b-similar__album-cover': 'togglePlay'
			'click .b-similar__add-button': 'addToAudio'
			'click .b-similar__like-button': 'addToWall'


		initialize: ( options )->
			@model.bind( 'change:selected', @renderSelected, this )

		_render: ()->
			@renderSelected()


		serialize: ()->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )
			cover: @model.get( 'info.images.small' ) or 'http://placekitten.com/g/64/64'


		renderSelected: ()->
			if @model.get ( 'selected' )
				@$el.addClass( 'b-similar_selected' )
			else
				@$el.removeClass( 'b-similar_selected' )


		play: ()->
			@model.play()


		pause: ()->
			@model.pause()


		togglePlay: ()->
			@model.togglePlay()


		showWiki: ()->


		addToAudio: ()->
			@model.addToAudio()


		addToWall: ()->
			@model.addToWall()
