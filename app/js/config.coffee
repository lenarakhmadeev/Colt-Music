
'use strict'

require.config
	# Начальная точка приложения
	deps: [ 'app' ]
	baseUrl: 'js'
	paths:
		# Библиотеки
		jquery: 'libs/jquery/jquery-1.8.0'
		# http://lodash.com/
		# http://underscorejs.org/
		underscore: 'libs/lodash'
		# http://backbonejs.ru/
		backbone: 'libs/backbone'
		json2: 'libs/json2'

		# Плагины jquery
		jquery_jplayer: 'libs/jquery/jplayer/jquery.jplayer.min'
		jquery_jscroller: 'libs/jquery/jquery-scroller-v1.src'

		# Плагины requirejs
		text: 'libs/requirejs/text'
		tpl: 'libs/requirejs/tpl'

		# Путь к шаблонам
		templates: '../templates'

		# Библиотека vk.com API для iframe приложений
		vk: 'http://vk.com/js/api/xd_connection'
		

	# Загрузка не AMD модулей
	shim:
		backbone: 
			deps: [ 'jquery', 'underscore', 'json2' ]
			exports: 'Backbone'

		underscore:
			exports: '_'

		vk:
			exports: 'VK'

		jquery_jplayer:
			deps: [ 'jquery' ]

		jquery_jscroller:
			deps: [ 'jquery' ]

	# Константы для модулей
	config:
		'services/proxy/proxy':
			'lastFm_key': 'b25b959554ed76058ac220b7b2e0a026'
			'lastFm_url': 'http://ws.audioscrobbler.com/2.0/'