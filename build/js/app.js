/*
	+Выделение записи
	+Играть похожие
	list

	Хороший код!!!
		баги
		хаки
		Коллекции
		вынести proxy

	плееер
		Доделать строку

	Верстка
		livereload
*/

define(['views/AppView', 'services/player', 'services/list'], function(AppView, player, list) {
  var appView;
  appView = new AppView();
  appView.render();
  $('body').append(appView.el);
  player.init();
  return list.init();
});
