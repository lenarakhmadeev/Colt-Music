
###
	+Выделение записи
	+Играть похожие
	+list

	
	+webstorm

	Хороший код!!!
		баги
		хаки
		Коллекции
		вынести proxy
		комменты

	плееер
		Доделать строку

	Верстка
		livereload




	+привести модели к единому виду, чтобы их можно было проигрываить
	Наследовать ListCollection от Collection

	+размер приложения
	
	use strict

	list грузить след страницу
	undefined в шаблонах

	proxy jpath

	когда долистал, грузить след стр?

###


define [
	'views/AppView'
	'services/player'
	'services/list'

], ( AppView, player, list )->

	'use strict'

	# Создаем главную вью приложения
	appView = new AppView()
	appView.render()

	# Добавляем его к body
	$( 'body' ).append( appView.el )

	# Запускаем не MVC модули
	player.init()
	list.init()

