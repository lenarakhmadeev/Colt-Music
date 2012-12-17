
define ( require )->
	noty = require( 'services/noty' )
	mediator = require( 'services/mediator' )
	urlParams = require( 'services/urlParams' )


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
		userSuccess: ( message )->
			noty.success( message )

		# Ошибка
		userError: ( message )->
			noty.error( message )

		# Оповещение
		userInfo: ( message )->
			noty.info( message )

		# _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);

		log: ( message )->
			console.log 'logger.log', message
			_gaq.push(['_trackEvent', 'logger', 'log', message, urlParams['viewer_id'], true]);


		error: ( message )->
			console.log 'logger.error', message
			_gaq.push(['_trackEvent', 'logger', 'error', message, urlParams['viewer_id'], true]);

