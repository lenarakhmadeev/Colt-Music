
define [
	'services/noty'
	'services/mediator'

], ( noty, mediator )->

	'use strict'

	logger =

		init: ()->
			noty.init()

			# Выводятся пользователю
			mediator.subscribe( 'logger:user:success', @userSuccess, this )
			mediator.subscribe( 'logger:user:error', @userError, this )
			mediator.subscribe( 'logger:user:info', @userInfo, this )

			# Для дебага
			mediator.subscribe( 'logger:log', @log, this )
			mediator.subscribe( 'logger:error', @log, this )


		userSuccess: ( message )->
			noty.success( message )


		userError: ( message )->
			noty.error( message )


		userInfo: ( message )->
			noty.info( message )


		log: ( message )->
			console.log 'logger.log', message


		error: ( message )->
			console.log 'logger.error', message

