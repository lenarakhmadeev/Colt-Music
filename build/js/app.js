/*
	+Выделение записи
	+Играть похожие
	list

	
	webstorm

	Хороший код!!!
		баги
		хаки
		Коллекции
		вынести proxy
		комменты

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
