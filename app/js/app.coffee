
###
	+Выделение записи
	+Играть похожие
	list

	Хороший код!!!
		баги
		хаки
		Коллекции
		вынести proxy

	плееер
		Доделать строку

	Верстка
		livereload


###


define [
	'views/AppView'
	'services/player'
	'services/list'

], (AppView, player, list)->
	
	# Создаем главную вью приложения
	appView = new AppView()
	appView.render()

	# Добавляем его к body
	$('body').append( appView.el )

	# Запускаем не MVC модули
	player.init()
	list.init()

	