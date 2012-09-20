
define [
	'views/View'
	'views/SimilarsView'
	'tpl!templates/item.html'
	
], ( View, SimilarsView, itemTemplate )->

	'use strict'

	class ItemView extends View

		template: itemTemplate

		className: 'item'

		events:
			'click .BigImg': 'play'


		initialize: ( options )->
			@model.bind( 'change:info', @render, this )
			@model.bind( 'change:selected', @renderSelected, this )

			@similarsView = new SimilarsView( collection: @model.similarsCollection )


		serialize: ()->
			artist: @model.get( 'artist' )
			title: @model.get( 'title' )
			cover: @model.get( 'info.images.large' ) or 'images/big.png'
			album: @model.get( 'info.album' )
			tags: ( @model.get( 'info.tags' ) or [] ).join(', ')


		_render: ()->
			@similarsView.render()
			@append( @similarsView )


		renderSelected: ()->
			if @model.get( 'selected' )
				@$el.addClass( 'selected' )
			else
				@$el.removeClass( 'selected' )


		play: ()->
			@model.play()

