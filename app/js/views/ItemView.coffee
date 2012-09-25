
define [
	'views/View'
	'views/SimilarsView'
	'views/InfoView'
	'tpl!templates/item.html'
	
], ( View, SimilarsView, InfoView, itemTemplate )->

	'use strict'

	class ItemView extends View

		template: itemTemplate

		className: 'b-item'

		events:
			'click .b-item__album-cover': 'play'
			'click .b-item__like-button': 'addToWall'


		initialize: ( options )->
			@model.bind( 'change:selected', @renderSelected, this )
			@model.bind( 'change:info', @renderCover, this )

			@similarsView = new SimilarsView( collection: @model.similarsCollection )
			@infoView = new InfoView( model: @model )


		serialize: ()->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )


		_render: ()->
			@infoView.render()
			@append( '.b-item__info-place', @infoView )

			@similarsView.render()
			@append( '.b-item__similars-place', @similarsView )

			@renderCover()

			@renderSelected()


		renderCover: ()->
			cover = @model.get( 'info.images.126' ) or 'images/big.png'
			@$( '.b-item__cover-image' ).attr( 'src', cover )


		renderSelected: ()->
			if @model.get( 'selected' )
				@$el.addClass( 'b-item_selected' )
			else
				@$el.removeClass( 'b-item_selected' )


		play: ()->
			@model.play()


		addToWall: ()->
			@model.addToWall()

