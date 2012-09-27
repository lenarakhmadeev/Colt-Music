
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
			@set( 'current', model )


		pause: ()->
			@getCurrent().pause()


		resume: ()->
			current = @getCurrent()

			# Проверка первого нажатия
			if current?
				current.resume()
			else
				mediator.publish( 'list:play_first' )


		getCurrent: ()->
			@get( 'current' )



