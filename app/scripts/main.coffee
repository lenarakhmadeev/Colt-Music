
###
	+Выделение записи
	+Играть похожие
	+list

	+webstorm

	+Доделать строку

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

	+прелоад (сложно)
		+fetch для Item
		+след страница
		+след реком

	+proxy
		+jpath оборачивает все в массив((
		+разделить прокси vk и lfm

	-Для каждой вьюхи своё место без аппенда просто в конец
		setElement

	+При загрузке на паузе первая запись

	+рендер выделения
		+item
		+similar

	+вьюхи с плеем слушают события
		-player:state - play, pause
		+подумать короче

	+размеры обложек

	-починить grunt
		+compass
		-livereload

	-Спрашивать, когда добавляешь в аудио или оповещать

	-Вью для обложки альбома

	+проигрывание первой записи при загрузке

	+поправить события медиатора
		+list, load

	+Переименовать js в scripts

	+Все данные чтобы влезали
		-tags
		+имена

	+сообщения пользователю
		+сделать всплывающее окошко для info
		-error debug в GA

	-оставить только тракмодел, остальные килл

	+Скрыть нерабочие кнопки


	Верстка
		+цвета отдельно для scss
		+Перевести все на БЭМ
			+Убрать страые стили
		+Плеер
		-Кнопки навигации верху и внизу

	+чтобы плеер с навигацией ездил

	+noty сломался

	+ресайз контейнера

	+картинки

	+колонки css3 тупые

		+переделать list
		+событие для след страницы
		+прелоад

	+Деплой

	+на кнопках pointer

	+ie delete bug

	+обложка альбома в плеер как устанавливать

	+текущая похожаая

	+колонки таблицей

	+lastfm ключ

	проверить перендеры
_________________________________
	ver 1.5

		сглаживание шрифтов

		notyfication
			логи

		Посмотреть все минусы

		статусы записи
			в моем списке/ могу лайкать, удалять, редактировать
			не в списке / ( либо похожее, либо поиск, либо других пользователй )

			добалена??


		кэш для proxy
			localstorge и объект
			декоратор

			интервалы запросов

		посмотреть апи musicbrainz http://the.echonest.com/

			wallpost с картинкой

		бек плеера css

	ver 2.0

		какой-то баг с jplayerom
			Избавиться от jplayera

		Что делать, если для сим не найдено аудио
			фильры
			менять название??

		запоминать в локалсторадж страницу
			последняя запись или лала

		Лушее формирование реком
			топ записей артиста

			топы похожих артистов

		Окно для вики

		поиск

		записи друзей

###


define (require) ->
	# Хак, чтобы убрать из window
	_ = require('_').noConflict()
	$ = require('$').noConflict()
	Backbone = require('Backbone').noConflict()

	# IE delete bug
	try
		delete window._
		delete window.$
		delete window.Backbone
	catch e

	# Сбор ошибок jQuery
	$.error = (message) ->
		_gaq.push( [ '_trackEvent', 'jQuery Error', message, navigator.userAgent, 0, true ] )

	AppView = require 'views/AppView'
	player = require 'services/player'
	flow = require 'services/flow'
	logger = require 'services/logger'
	scroll = require 'services/scroll'
	vkProxy = require 'services/proxy/vkProxy'

	# Создаем главную вью приложения
	appView = new AppView()
	appView.render()

	# Добавляем его к body
	$('body').append appView.el

	# Запускаем не MVC модули
	player.init()
	flow.init()
	logger.init()
	scroll.init()

	# Запрашиваем добавление в меню
	vkProxy.addToMenu()

