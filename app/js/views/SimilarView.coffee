
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
			'click .play-button' : 'play'
			'click .pause-button': 'pause'
			'click .album-cover': 'togglePlay'
			'click .add-button': 'addToAudio'
			'click .like-button': 'addToWall'


		initialize: ( options )->
			@model.bind( 'change:selected', @renderSelected, this )

		_render: ()->
			@renderSelected()


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


		pause: ()->
			@model.pause()


		togglePlay: ()->
			@model.togglePlay()


		showWiki: ()->


		addToAudio: ()->
			@model.addToAudio()


		addToWall: ()->
			@model.addToWall()
