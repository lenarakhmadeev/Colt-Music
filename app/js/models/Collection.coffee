
define [
	'backbone'

], (Backbone)->

	class Collection extends Backbone.Collection

		constructor: ()->
			super( arguments... )

			@own = new Backbone.Model()
			@own.on( 'all', @_ownEvents, this )

			@on( 'all', @_calcAttr, this )


		_ownEvents: (event, model, collection, options)->
			arguments[0] = "own:#{ arguments[0] }"
			@trigger.apply( this, arguments )


		_calcAttr: ()->
			for attr, fun of @calculated
				@own.set( attr, @[fun].apply( this ) )

