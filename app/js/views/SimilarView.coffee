
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
			'click .b-similar__wiki-button': 'showWiki'


		initialize: ( options )->
			@model.on( 'change:selected', @renderSelected, this )
			@model.on( 'change:played', @renderPlayed, this )


		_render: ()->
			@renderSelected()
			@renderPlayed()


		serialize: ()->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )
			cover: @model.get( 'info.images.64' ) or 'http://placekitten.com/g/64/64'


		renderSelected: ()->
			if @model.get ( 'selected' )
				@$el.addClass( 'b-similar_selected' )
			else
				@$el.removeClass( 'b-similar_selected' )


		renderPlayed: ()->
			if @model.get( 'played' )
				@$( '.b-similar__play-button').hide()
				@$( '.b-similar__pause-button').show()
			else
				@$( '.b-similar__play-button').show()
				@$( '.b-similar__pause-button').hide()


		play: ()->
			@model.play()


		pause: ()->
			@model.pause()


		togglePlay: ()->
			@model.togglePlay()


		addToAudio: ()->
			@model.addToAudio()


		addToWall: ()->
			@model.addToWall()


		showWiki: ()->