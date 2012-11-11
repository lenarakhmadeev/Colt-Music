requirejs.config
	# Начальная точка приложения
	deps: [ 'main' ]

	baseUrl: 'scripts'

	paths:
		# Библиотеки
		$: 'libs/jquery/jquery-1.8.0'
		# http://lodash.com/
		# http://underscorejs.org/
		_: 'libs/lodash'
		# http://backbonejs.ru/
		Backbone: 'libs/backbone/backbone'
		json2: 'libs/json2'
		# https://github.com/artjock/jpath
		jpath: 'libs/jpath'
		# http://wavded.github.com/humane-js/
		humane: 'libs/humane'

		# Плагины requirejs
		text: 'libs/requirejs/text'
		tpl: 'libs/requirejs/tpl'

		# Путь к шаблонам
		templates: '../templates'

		# Библиотека vk.com API для iframe приложений
		vk: 'http://vk.com/js/api/xd_connection'

	map:
		# Синонимы
		'*':
			underscore: '_'
			backbone: 'Backbone'
			jquery: '$'

	# Загрузка не AMD модулей
	shim:
		Backbone:
			deps: [ '$', '_', 'json2' ]
			exports: ()->
				# Загружаем плагины сразу, так проще
				# http://afeld.github.com/backbone-nested/
				require [ 'libs/backbone/backbone-nested' ]

				this.Backbone

		$:
			exports: ()->
				# Загружаем плагины сразу, так проще
				require [ 'libs/jquery/jplayer/jquery.jplayer.min', 'libs/jquery/marquee' ]

				this.$

		vk:
			exports: 'VK'

		jpath:
			exports: 'jpath'


	# Константы для модулей
	config:
		# Ключ для доступа к Last.fm API
		'services/proxy/lastFmProxy':
			lastFm_key: '6e827e122dacfa2346e88ef5a964b196'
			lastFm_url: 'http://ws.audioscrobbler.com/2.0/'

		# Путь до swf плеера jPlayer
		'services/player':
			swf_path: 'scripts/libs/jquery/jplayer'

# Хендлер для ошибок
requirejs.onError = ( errObject )->
	requireType = errObject.requireType
	requireModules = errObject.requireModules
	console.log( requireType, requireModules )
