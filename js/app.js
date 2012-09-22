/*
	+Выделение записи
	+Играть похожие
	+list

	
	+webstorm

	Хороший код!!!
		баги
		хаки
		Коллекции
		вынести proxy
		комменты

	+Доделать строку

	Верстка
		livereload

	+привести модели к единому виду, чтобы их можно было проигрываить
	+Наследовать ListCollection от Collection
	+размер приложения
	+use strict
	+list грузить след страницу
	+undefined в шаблонах
	+proxy jpath

	+лишний рендер Item после загрузки пустой инфы и реком

	прелоад
		след страница
		след реком

	list на первой и последней записи

	Для каждой вьюхи своё место без аппенда просто в конец

	Вью для обложки альбома
*/

define(['views/AppView', 'services/player', 'services/list'], function(AppView, player, list) {
  'use strict';

  var appView;
  appView = new AppView();
  appView.render();
  $('body').append(appView.el);
  player.init();
  return list.init();
});
