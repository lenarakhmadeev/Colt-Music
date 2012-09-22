
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

	+Доделать строку

	Верстка
		livereload




	+привести модели к единому виду, чтобы их можно было проигрываить
	+Наследовать ListCollection от Collection
	+размер приложения
	+use strict
	+list грузить след страницу
	+undefined в шаблонах
	+proxy jpath

	+лишний рендер Item после загрузки пустой инфы и реком
	прелоад
		след страница
		след реком

	Since view.$(selector) is now equivalent to view.$el.find(selector) rather
	 than $(selector, view.el) it can no longer be used when selector is an HTML string or DOM element.


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

