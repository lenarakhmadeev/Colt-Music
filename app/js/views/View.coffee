
define [
	'underscore'
	'backbone'
	
], (_, Backbone)->

	class View extends Backbone.View

		serialize: ()->
			if @model
				@model.toJSON()
			else
				if @collection
					items: @collection.toJSON()
				else
					{}


		renderTemplate: ()->
			@template( data: @serialize() ) if @template


		render: ()->
			@$el.children().remove()
			@$el.empty()
			@$el.html( @renderTemplate() )

			@_render.apply(this, arguments) if _.isFunction( @_render )

			@delegateEvents()

			this


		append: (view)->
			@$el.append( view.el )