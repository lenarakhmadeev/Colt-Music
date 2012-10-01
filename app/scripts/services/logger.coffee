
define [
	'services/noty'
	'services/mediator'

], ( noty, mediator )->

	'use strict'

	# Логгер. Часть логов выводится пользователю
	# Возможно, стоит разделить или как-то переосмыслить
	logger =

		# Инициализация модуля
		init: ()->
			noty.init()

			# Выводятся пользователю
			mediator.subscribe( 'logger:user:success', @userSuccess, this )
			mediator.subscribe( 'logger:user:error', @userError, this )
			mediator.subscribe( 'logger:user:info', @userInfo, this )

			# Для дебага
			mediator.subscribe( 'logger:log', @log, this )
			mediator.subscribe( 'logger:error', @error, this )


		# Успешное выполнение
		userSuccess: noty.success

		# Ошибка
		userError: noty.error

		# Оповещение
		userInfo: noty.info


		log: ( message )->
			console.log 'logger.log', message


		error: ( message )->
			console.log 'logger.error', message

