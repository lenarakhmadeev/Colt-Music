
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

	+list на первой и последней записи

	+штуки вконтакте
		+добавить и аудиозаписи
		+добавить на стенку (Отправить другу) расшарить короче

	*прелоад (сложно)
		+fetch для Item
		+след страница
		+след реком

	proxy
		jpath оборачивает все в массив((

	Для каждой вьюхи своё место без аппенда просто в конец
		setElement

	статусы записи
		в моем списке/ могу лайкать, удалять, редактировать
		не в списке / ( либо похожее, либо поиск, либо других пользователй )

		добалена??

	Спрашивать, когда добавляешь в аудио или оповещать

	Вью для обложки альбома

	Что делать, если для сим не найдено аудио

	При загрузке на паузе первая запись


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

