
define ( require ) ->
	View = require( 'views/View' )
	SimilarsView = require( 'views/SimilarsView' )
	InfoView = require( 'views/InfoView' )
	itemTemplate = require( 'tpl!templates/item.html' )
	C = require( 'services/constants' )


	class ItemView extends View

		template: itemTemplate

		className: 'b-item'

		events:
			'click .b-item__play-button': 'play'
			'click .b-item__pause-button': 'pause'
			'click .b-item__album-cover': 'togglePlay'
			'click .b-item__track-title': 'togglePlay'
			'click .b-item__like-button': 'addToWall'


		initialize: ( options ) ->
			@model.on( 'change:selected', @renderSelected, this )
			@model.on( 'change:played', @renderPlayed, this )
			@model.on( 'change:info', @renderCover, this )

			@similarsView = new SimilarsView( collection: @model.similarsCollection )
			@infoView = new InfoView( model: @model )


		serialize: ->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )


		_render: ->
			@infoView.render()
			@append( '.b-item__info-place', @infoView )

			@similarsView.render()
			@append( '.b-item__similars-place', @similarsView )

			@renderCover()

			@renderSelected()
			@renderPlayed()


		renderCover: ->
			cover = @model.get( 'info.images.126' ) or C.BIG_COVER
			@$( '.b-item__cover-image' ).attr( 'src', cover )


		renderSelected: ->
			if @model.get( 'selected' )
				@$el.addClass( 'b-item_selected' )
			else
				@$el.removeClass( 'b-item_selected' )


		renderPlayed: ->
			if @model.get( 'played' )
				@$( '.b-item__play-button' ).hide()
				@$( '.b-item__pause-button' ).show()

				@$( '.b-item__album-cover, .b-item__track-title' ).attr( 'title', 'Пауза' )
			else
				@$( '.b-item__play-button' ).show()
				@$( '.b-item__pause-button' ).hide()

				@$( '.b-item__album-cover, .b-item__track-title' ).attr( 'title', 'Играть' )


		play: ->
			@model.play()


		pause: ->
			@model.pause()


		togglePlay: ->
			@model.togglePlay()


		addToWall: ->
			@model.addToWall()

