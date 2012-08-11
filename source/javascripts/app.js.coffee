

###
	Доделать прокси
		Фильтры

	Кнопка ещё

	Выделение верстка
	Почистить все
	Верстка
	Инжекция зависимостей

	v0.7

	handlebars
	Нет плеера, но есть список аудио пользователя со всеми записями
	чистый код
		переписать код proxy


	v 0.8

	Шаблоны генерятся на сервере?
	Есть плеер
	Играет при клике по записи
	Список выводится весь
	Нет навигации по записями
	Нет wiki
	Остально должно работать
	И должно быть чистенько, собирватся само и все с деплоем
###
$(()->
	VK.init(()->
		VK.api('audio.get', {}, (data)->
			l 'AAAAAAAAAAAAA', arguments

			l data, dataFilter
			audio = dataFilter.getAudio(data)
			l audio

			items = new ItemCollection(audio)

			appView = new AppView()

			$('#listCont').append(appView.el)

			appView.renderCollection(items)

		)
	)

)
