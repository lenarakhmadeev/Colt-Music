define (require) ->
	_ = require '_'
	Collection = require 'collections/Collection'
	ItemModel = require 'models/ItemModel'
	mediator = require 'services/mediator'
	proxy = require 'services/proxy/proxy'
	C = require 'services/constants'


	# Список аудиозаписей пользователя
	class ListCollection extends Collection

		model: ItemModel

		initialize: (models, options) ->
			@on 'reset', @firstLoad, this

			mediator.subscribe 'list:load_page', @loadPage, this
			mediator.subscribe 'list:play_first', @playFirst, this


		# Получает список аудиозаписей
		getAudio: ->
			proxy.getAudioList()
				.done (data) =>
					@reset data


		# Первая загрузка страница
		firstLoad: ->
			@loadPage 0


		# Проигрывает первую запись на странице
		playFirst: ->
			@getFirstTrack().play()


		# Возвращает первую запись на странице
		getFirstTrack: ->
			@own.get('content')[0]


		# Загружает страницу
		loadPage: (page) ->
			return if page == @own.get('page')

			@preloadPage page
			@_loadPage page

			@preloadPage(page + 1)


		# Устанавливает аттрибуты коллекции для нужной страницы
		_loadPage: (page) ->
			@own.set 'page', page
			@own.set 'content', @getPage(page)


		# Предзагружает страницу
		preloadPage: (page) ->
			content = @getPage(page)
			@fetchContent(content)


		# Заполняет модели данными
		fetchContent: (content) ->
			_.each content, @fetchItem, this


		# Заполняет модель данными
		fetchItem: (model) ->
			model.fetch()


		# Моделей на странице
		pageSize: C.PAGE_SIZE


		# Возвращает модели страницы
		getPage: (page) ->
			start = page * @pageSize
			end = (page + 1) * @pageSize
			@[start...end]


		# Возвращает количество страниц в списке
		pagesCount: ->
			Math.ceil(@length / @pageSize)


		# Загружает следующую страницу
		nextPage: ->
			@loadPage(@own.get('page') + 1)


		# Загружает предыдущую страницу
		prevPage: ->
			@loadPage(@own.get('page') - 1)