

###
	1) +Когда рендерим item sim делаем как будто их нет, а renderSimilar их переделывает
		Кнопка "еще"
	2) +Проблема с tag
	3) Репа на гитхабе
	4) Почистить всё
	5) +Филлер картинок не котик
	6) handlebars
		компиляция на сервере
		все шаблоны?
	7) верстка
		выделение

	!______

	Переделать нахрен всю фильтрацию и прокси вообще


	v 0.8

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
