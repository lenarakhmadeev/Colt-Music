
define [
	'views/View'
	'views/SimilarsView'
	'views/InfoView'
	'tpl!templates/item.html'
	
], ( View, SimilarsView, InfoView, itemTemplate )->

	'use strict'

	class ItemView extends View

		template: itemTemplate

		className: 'item'

		events:
			'click .BigImg': 'play'
			'click .ItemLikeB': 'addToWall'


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
			@append( '.ItemAlbumCont', @infoView )

			@similarsView.render()
			@append( @similarsView )

			@renderCover()

			@renderSelected()


		renderCover: ()->
			cover = @model.get( 'info.images.large' ) or 'images/big.png'
			@$( '.BigImg' ).attr( 'src', cover )


		renderSelected: ()->
			if @model.get( 'selected' )
				@$el.addClass( 'selected' )
			else
				@$el.removeClass( 'selected' )


		play: ()->
			@model.play()


		addToWall: ()->
			@model.addToWall()

