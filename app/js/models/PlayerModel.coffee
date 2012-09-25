
define [
	'backbone'
	'services/mediator'
	'services/player'

], ( Backbone, mediator, player )->

	'use strict'

	class PlayerModel extends Backbone.Model

		initialize: ( attributes, options )->
			mediator.subscribe( 'player:play', @play, this )


		play: ( model )->
			console.log 'play', model

			@set( 'current', model )


		pause: ()->
			@getCurrent().pause()


		resume: ()->
			@getCurrent().resume()


		getCurrent: ()->
			@get( 'current' )



