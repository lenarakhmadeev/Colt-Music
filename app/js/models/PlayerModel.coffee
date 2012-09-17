
define [
	'backbone'
	'services/mediator'

], (Backbone, mediator)->

	class PlayerModel extends Backbone.Model

		initialize: (attributes, options)->
			mediator.subscribe( 'player:play', @play, this )
			mediator.subscribe( 'player:pause', @pause, this )
			mediator.subscribe( 'player:resume', @resume, this )


		play: (model)->
			@set( model.toJSON() )

			@set( 'played', true )
		

		pause: ()->
			@set( 'played', false )


		resume: ()->
			@set( 'played', true )



