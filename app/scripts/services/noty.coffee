
define [
	'underscore'
	'jquery'
	'vk'
	'humane'

], ( _, $, vk, humane )->

	# Оповещения пользователю
	noty =

		# Время, которое показывается сообщение (мс)
		timeout: 1500

		# Инициализация модуля
		init: ()->
			# Слушаем событие скролла VK, чтобы позиционировать оповещение
			vk.callMethod( 'scrollSubscribe', fireEvent: true )
			vk.addCallback( 'onScroll', _.bind( @_onScroll, this ) )

			@_extendHumane()


		# Расширяем humane новыми типами сообщений
		_extendHumane: ()->
			humane.error = humane.spawn
				addnCls: 'humane-original-error'
				timeout: @timeout

			humane.success = humane.spawn
				addnCls: 'humane-original-success'
				timeout: @timeout


		# Сообщение об ошибке
		error: ( message )->
			@_notify( 'error', message )


		# Сообщение об успешном выполнении
		success: ( message )->
			@_notify( 'success', message )


		# Простое сообщение
		info: ( message )->
			@_notify( 'log', message )


		# Общий метод вывода сообщений
		_notify: ( type, message )->
			humane[ type ]( message )

			# Хак! Чтобы сообщение было видно пользователю
			# Изначальное поведение выводит сообщение посредине body
			$( '.humane' ).offset( top: @_getPosition() )


		# Возвращает смещение сверху в пискелях для сообщения
		_getPosition: ()->
			@topPosition


		# Запоминаем положение скролла
		_onScroll: ( @scrollTop )->