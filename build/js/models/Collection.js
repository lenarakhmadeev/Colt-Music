var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var Collection;
  return Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
      this.own = new Backbone.Model();
      this.own.on('all', this._ownEvents, this);
      this.on('all', this._calcAttr, this);
    }

    Collection.prototype._ownEvents = function(event, model, collection, options) {
      arguments[0] = "own:" + arguments[0];
      return this.trigger.apply(this, arguments);
    };

    Collection.prototype._calcAttr = function() {
      var attr, fun, _ref, _results;
      _ref = this.calculated;
      _results = [];
      for (attr in _ref) {
        fun = _ref[attr];
        _results.push(this.own.set(attr, this[fun].apply(this)));
      }
      return _results;
    };

    return Collection;

  })(Backbone.Collection);
});
