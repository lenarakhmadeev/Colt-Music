
(function($) {

	$.fn.marquee = function(text, speed) {

		var that = this;

		// Доступные скорости
		that.speeds = {
			low: 60,
			medium: 30,
			fast: 10
		};

		// Создаем бегущую строку
		var marquee_text = $('<p class="j-marquee-text">' + text + '</p>')
			.css({
				float: 'left',
				margin: 0
			});

		var marquee = $('<div class="j-marquee"></div>')
			.css({
				'overflow': 'hidden',
				'width': '32000px',
				'position': 'absolute',
				'left': '0'
			})
			.append(marquee_text)
			.appendTo(that);

		// Останавливаем анимацию
		marquee.stop(true);

		// Ширина прокручиваемого текста
		var text_width = $('.j-marquee-text', marquee).width();

		// Кэшируем
		var that_width = that.width();

		// Рекурсиваная анимация
		var animate = function (width) {
			marquee.animate({left: -text_width}, {
				duration : width * that.speeds[speed],
				queue    : false,
				easing   : 'linear',
				complete : function () {
					marquee.css('left', that_width);
					animate(text_width + that_width);
				}
			});
		};

		// Прокрутка, если не влезает в блок
		if (text_width > that_width) {
			animate(text_width);
		}

		return this;

	};

})(jQuery);