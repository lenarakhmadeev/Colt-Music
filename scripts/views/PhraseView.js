var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var PhraseView, View, no_phrases, yes_phrases;
  View = require('views/View');
  yes_phrases = ['Похожее', 'Ой, смотри - что для тебя нашли', 'Возможно заинтересует', 'После этого трека слушают:', 'Ещё хорошей музыки?', 'Рекомендуем!', 'А это уже слышали?', 'По секрету - это отличные треки', 'Послушай', 'Такая вот музыка', 'Может, понравится', 'Как тебе?', 'Определено, то, что ты искал', 'Музыка "что надо"', 'Должно понравиться', 'Вот как-то так', 'Джеймс Бонд все нашел', 'Женщина-кошка остановила свой выбор на:', 'Слышали, может?', 'Работаем без отдыха', 'Исключительно для тебя', 'Хорошей музыки много не бывает', 'На твой вкус'];
  no_phrases = ['Жаль, но ничего не нашлось', 'Пока ничего похожего не найдено', 'Поищем еще!', 'Не с кем даже сравнить', 'Может, послушаем что-то другое', 'Совпадений не найдено', 'Вот незадача - ничего не нашли', 'Тю-тю', 'Послушаем что-то другое?', 'Пока сложно найти что-то похожее', 'Поработаем надо этим', 'Приходи попозже, мы еще поищем', 'Тяжело что-то порекомендовать', 'Они слишком индивидуальны', 'Миссия невыполнима', 'Ур-ру-ру, кто-то тут ничего не нашел', 'Халк все диски раздавил', 'Да что за беда', 'Мы таких не знаем', 'Индиана Джонс ищет Грааль - он не может вам помочь', 'Просим прощения, исправимся', 'Ищем-ищем, найти не можем'];
  return PhraseView = (function(_super) {

    __extends(PhraseView, _super);

    function PhraseView() {
      return PhraseView.__super__.constructor.apply(this, arguments);
    }

    PhraseView.prototype.tagName = 'span';

    PhraseView.prototype.className = 'b-similars__phrase';

    PhraseView.prototype.initialize = function(options) {
      return this.collection.on('reset add remove', this.render, this);
    };

    PhraseView.prototype._render = function() {
      return this.renderPhrase(this.collection.length);
    };

    PhraseView.prototype.renderPhrase = function(yes_) {
      var phrase, phrases;
      if (yes_ == null) {
        yes_ = true;
      }
      phrases = yes_ ? yes_phrases : no_phrases;
      phrase = this.randomElem(phrases);
      return this.$el.html(phrase);
    };

    PhraseView.prototype.randomElem = function(arr) {
      var indx;
      indx = Math.floor(Math.random() * arr.length);
      return arr[indx];
    };

    return PhraseView;

  })(View);
});
