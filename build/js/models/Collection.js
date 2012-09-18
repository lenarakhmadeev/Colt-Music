var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  /*
  		Упорядоченная коллекция со своими аттрибутами
  */

  var Collection;
  return Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
      this.own = new Backbone.Model();
      this.on('reset add remove', this.makeModelsOrder, this);
    }

    Collection.prototype.makeModelsOrder = function() {
      var model, order, _i, _len, _ref, _results;
      order = 1;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        _results.push(model.set({
          'order': order++
        }, {
          silent: true
        }));
      }
      return _results;
    };

    return Collection;

  })(Backbone.Collection);
});
