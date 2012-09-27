
define [
	'services/mediator'

], ( mediator )->

	'use strict'

	logger =

		init: ()->
			mediator.subscribe( 'logger:error', @errorMessage, this )
			mediator.subscribe( 'logger:info', @infoMessage, this )
			mediator.subscribe( 'logger:debug', @debugMessage, this )


		errorMessage: ( message )->
			console.log 'error', message


		infoMessage: ( message )->
			console.log 'info', message


		debugMessage: ( message	)->
			console.log 'debug', message