/*
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

--------------------------------------------------------------------------------

	переделать list
		событие для след страницы
		прелоад

	оставить только тракмодел, остальные килл

	сообщения пользователю
		сделать всплывающее окошко для info
		error debug в GA

	Верстка
		+цвета отдельно для scss
		Перевести все на БЭМ
			Убрать страые стили
		Плеер
		Кнопки навигации верху и внизу
		Верстка item
			*колонки css3 тупые

		Скрыть нерабочие кнопки


	ver 1.5

		статусы записи
			в моем списке/ могу лайкать, удалять, редактировать
			не в списке / ( либо похожее, либо поиск, либо других пользователй )

			добалена??


		кэш для proxy
			localstorge и объект
			декоратор

		посмотреть апи musicbrainz http://the.echonest.com/

	ver 2.0

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
*/

define(['views/AppView', 'services/player', 'services/flow', 'services/logger'], function(AppView, player, flow, logger) {
  'use strict';

  var appView;
  appView = new AppView();
  appView.render();
  $('body').append(appView.el);
  player.init();
  flow.init();
  return logger.init();
});
