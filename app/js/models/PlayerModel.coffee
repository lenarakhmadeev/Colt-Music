
define [
	'backbone'
	'services/mediator'

], ( Backbone, mediator )->

	'use strict'

	class PlayerModel extends Backbone.Model

		initialize: ( attributes, options )->
			mediator.subscribe( 'player:play', @play, this )
			mediator.subscribe( 'player:pause', @pause, this )
			mediator.subscribe( 'player:resume', @resume, this )


		play: ( model )->
			@set( current: model )
			@setPlayed( true )


		pause: ()->
			@setPlayed( false )


		resume: ()->
			@setPlayed( true )


		setPlayed: ( played )->
			@set( 'played', played )



