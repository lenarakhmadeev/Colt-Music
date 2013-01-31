define (require) ->
	Backbone = require 'Backbone'
	mediator = require 'services/mediator'
	player = require 'services/player'


	class PlayerModel extends Backbone.Model

		initialize: ->
			mediator.subscribe 'player:play', @play, this


		play: (model) ->
			@set 'current', model


		pause: ->
			@getCurrent().pause()


		resume: ->
			current = @getCurrent()

			# Проверка первого нажатия
			if current?
				current.resume()
			else
				mediator.publish 'list:play_first'


		getCurrent: ->
			@get 'current'



