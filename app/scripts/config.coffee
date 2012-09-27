
'use strict'

require.config
	# Начальная точка приложения
	deps: [ 'main' ]
	baseUrl: 'scripts'
	paths:
		# Библиотеки
		jquery: 'libs/jquery/jquery-1.8.0'
		# http://lodash.com/
		# http://underscorejs.org/
		underscore: 'libs/lodash'
		# http://backbonejs.ru/
		backbone: 'libs/backbone/backbone'
		json2: 'libs/json2'
		# https://github.com/artjock/jpath
		jpath: 'libs/jpath'

		# Плагины jquery
		jquery_jplayer: 'libs/jquery/jplayer/jquery.jplayer.min'
		jquery_marquee: 'libs/jquery/marquee'

		# Плагины Backbone
		# http://afeld.github.com/backbone-nested/
		backbone_nested: 'libs/backbone/backbone-nested'

		# Плагины requirejs
		text: 'libs/requirejs/text'
		tpl: 'libs/requirejs/tpl'

		# Путь к шаблонам
		templates: '../templates'

		# Библиотека vk.com API для iframe приложений
		vk: 'http://vk.com/js/api/xd_connection'
		

	# Загрузка не AMD модулей
	shim:
		backbone_nested:
			deps: [ 'backbone' ]

		backbone: 
			deps: [ 'jquery', 'underscore', 'json2' ]
			exports: 'Backbone'

		underscore:
			exports: '_'

		vk:
			exports: 'VK'

		jquery_jplayer:
			deps: [ 'jquery' ]

		jquery_marquee:
			deps: [ 'jquery' ]

		jpath:
			exports: 'jpath'


	# Константы для модулей
	config:
		# Ключ для доступа к Last.fm API
		'services/proxy/lastFmProxy':
			lastFm_key: 'b25b959554ed76058ac220b7b2e0a026'
			lastFm_url: 'http://ws.audioscrobbler.com/2.0/'

		# Путь до swf плеера jPlayer
		'services/player':
			swf_path: 'scripts/libs/jquery/jplayer'
