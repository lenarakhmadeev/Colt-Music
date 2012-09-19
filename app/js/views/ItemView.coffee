
define [
	'views/View'
	'views/SimilarsView'
	'tpl!templates/item.html'
	
], ( View, SimilarsView, itemTemplate )->
	
	class ItemView extends View

		template: itemTemplate

		className: 'item'

		events:
			'click .BigImg': 'play'


		initialize: ( options )->
			# todo !!!
			@model.bind( 'change', @render, this )
			@model.bind( 'change:selected', @renderSelected, this )

			@similarsView = new SimilarsView( collection: @model.similarsCollection )


		_render: ()->
			@similarsView.render()
			@append( @similarsView )


		renderSelected: ()->
			console.log 'sell'

			if @model.get( 'selected' )
				@$el.addClass( 'selected' )
			else
				@$el.removeClass( 'selected' )


		play: ()->
			@model.play()

