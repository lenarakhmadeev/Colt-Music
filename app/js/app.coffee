
###
	+Выделение записи
	+Играть похожие
	list

	
	webstorm

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




	привести модели к единому виду, чтобы их можно было проигрываить


###


define [
	'views/AppView'
	'services/player'
	'services/list'

], ( AppView, player, list )->
	
	# Создаем главную вью приложения
	appView = new AppView()
	appView.render()

	# Добавляем его к body
	$( 'body' ).append( appView.el )

	# Запускаем не MVC модули
	player.init()
	list.init()

