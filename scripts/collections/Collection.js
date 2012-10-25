var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Backbone, Collection;
  Backbone = require('backbone');
  'use strict';

  return Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      this.own = new Backbone.Model();
      this.on('reset add remove', this.recalculateIds, this);
      Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.recalculateIds = function() {
      var id, model, _i, _len, _ref;
      id = 1;
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        model.set({
          'id': id++
        });
      }
      return this.trigger('recalculated');
    };

    return Collection;

  })(Backbone.Collection);
});
