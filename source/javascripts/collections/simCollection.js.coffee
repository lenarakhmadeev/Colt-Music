
class @SimCollection extends Backbone.Collection

	model: SimModel

	###
		Еще - показывает еще часть рекомендаций
		Всегда кратно 2

		Кнопка еще должна иметь 3 состояния
			1) Еще
			2) Загрузка
			3) больше нет рекомендаций (неактивна)
	###

	# todo если реком мало, то запрос топа артиста


	initialize: (@artist, @title)->


	count: 2
	page: 1
	wait: false

	getMoreSimilar: ()=>
		l 'SimCollection.getMoreSimilar', arguments

		if @wait
			return

		@wait = true

		_proxy.getSimilar @artist, @title, @page++, @count, (err, data)=>
			@wait = false

			if err
				return l err

			@add(data)

