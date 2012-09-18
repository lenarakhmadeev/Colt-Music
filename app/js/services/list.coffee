
define [
	'services/mediator'

], ( mediator )->

	###
		Логика перехода к следующей/предыдущей записи в списке
	###
	list = 

		# Запуск модуля
		init: ()->
			mediator.subscribe( 'list:next', @next, this )
			mediator.subscribe( 'list:prev', @prev, this )
			mediator.subscribe( 'list:current', @setCurrent, this )


		# Проигрывание следующей записи
		next: ()->
			console.log 'next'


		# Проигрывание предыдущей записи
		prev: ()->
			console.log 'prev'


		# Устанавливает текущую запись
		setCurrent: ( track )->
			if @currentTrack?
				@currentTrack.select( false )

			@currentTrack = track
			@currentTrack.select( true )
