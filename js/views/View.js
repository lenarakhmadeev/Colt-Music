var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone'], function(_, Backbone) {
  var View;
  return View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.serialize = function() {
      if (this.model) {
        return this.model.toJSON();
      } else {
        if (this.collection) {
          return {
            items: this.collection.toJSON()
          };
        } else {
          return {};
        }
      }
    };

    View.prototype.renderTemplate = function() {
      if (this.template) {
        return this.template({
          data: this.serialize()
        });
      }
    };

    View.prototype.render = function() {
      this.$el.children().remove();
      this.$el.empty();
      this.$el.html(this.renderTemplate());
      if (_.isFunction(this._render)) {
        this._render.apply(this, arguments);
      }
      this.delegateEvents();
      return this;
    };

    View.prototype.append = function(view) {
      return this.$el.append(view.el);
    };

    return View;

  })(Backbone.View);
});
