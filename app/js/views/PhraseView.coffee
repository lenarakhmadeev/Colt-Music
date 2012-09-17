
define [
	'views/View'

], (View)->

	# Фразы, если что-то найдено
	yes_phrases = [
		'Похожее',
		'Ой, смотри - что для тебя нашли',
		'Возможно заинтересует',
		'После этого трека слушают:',
		'Ещё хорошей музыки?',
		'Рекомендуем!',
		'А это уже слышали?',
		'По секрету - это отличные треки',
		'Послушай',
		'Такая вот музыка',

		'Может, понравится',
		'Как тебе?',
		'Определено, то, что ты искал',
		'Музыка "что надо"',
		'Должно понравиться',
		'Вот как-то так',
		'Джеймс Бонд все нашел',
		'Женщина-кошка остановила свой выбор на:',
		'Слышали, может?',
		'Работаем без отдыха',

		'Исключительно для тебя',
		'Хорошей музыки много не бывает',
		'На твой вкус'
	]

	# Фразы, если ничего не найдено
	no_phrases = [
		'Жаль, но ничего не нашлось',
		'Пока ничего похожего не найдено',
		'Поищем еще!',
		'Не с кем даже сравнить',
		'Может, послушаем что-то другое',
		'Совпадений не найдено',
		'Вот незадача - ничего не нашли',
		'Тю-тю',
		'Послушаем что-то другое?',
		'Пока сложно найти что-то похожее',

		'Поработаем надо этим',
		'Приходи попозже, мы еще поищем',
		'Тяжело что-то порекомендовать',
		'Они слишком индивидуальны',
		'Миссия невыполнима',
		'Ур-ру-ру, кто-то тут ничего не нашел',
		'Халк все диски раздавил',
		'Да что за беда',
		'Мы таких не знаем',
		'Индиана Джонс ищет Грааль - он не может вам помочь',

		'Просим прощения, исправимся',
		'Ищем-ищем, найти не можем'
	]

	class PhraseView extends View

		tagName: 'span'

		className: 'ItemDelimPhrase'

		initialize: (options)->
			@collection.bind( 'reset add remove', @render, this )


		_render: ()->
			@renderPhrase( @collection.length )


		renderPhrase: (yes_ = true)->
			phrases = if yes_ then yes_phrases else no_phrases
			phrase = @randomElem( phrases )
			@$el.html( phrase )


		randomElem: (arr)->
			indx = Math.floor(Math.random() * arr.length)
			arr[indx]