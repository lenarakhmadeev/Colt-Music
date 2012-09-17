var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'mediator', 'views/View', 'tpl!templates/navigation.html'], function($, mediator, View, navigationTemplate) {
  var NavigationView;
  return NavigationView = (function(_super) {

    __extends(NavigationView, _super);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.prototype.template = navigationTemplate;

    NavigationView.prototype.className = 'Navigation';

    NavigationView.prototype.events = {
      'click .NavFirst, .NavPrev, .NavItem, .NavNext, .NavLast': 'navigatePage'
    };

    NavigationView.prototype.initialize = function(options) {};

    NavigationView.prototype.serialize = function() {
      var data, page, pages;
      page = this.model.get('page');
      pages = this.model.pagesCount();
      data = {
        pages: []
      };
      if (page) {
        data.pages.push({
          type: 'first',
          page: 0
        });
      }
      if (page) {
        data.pages.push({
          type: 'prev',
          page: page - 1
        });
      }
      if (page - 10 > -1) {
        data.pages.push({
          type: 'num',
          page: page - 10
        });
      }
      if (page - 10 > -1) {
        data.pages.push({
          type: 'space'
        });
      }
      if (page - 2 > -1) {
        data.pages.push({
          type: 'num',
          page: page - 2
        });
      }
      if (page - 1 > -1) {
        data.pages.push({
          type: 'num',
          page: page - 1
        });
      }
      data.pages.push({
        type: 'cur_num',
        page: page
      });
      if (page + 1 < pages) {
        data.pages.push({
          type: 'num',
          page: page + 1
        });
      }
      if (page + 2 < pages) {
        data.pages.push({
          type: 'num',
          page: page + 2
        });
      }
      if (page + 10 < pages) {
        data.pages.push({
          type: 'space'
        });
      }
      if (page + 10 < pages) {
        data.pages.push({
          type: 'num',
          page: page + 10
        });
      }
      if (pages > (page + 1)) {
        data.pages.push({
          type: 'next',
          page: page + 1
        });
      }
      if (pages > (page + 1)) {
        data.pages.push({
          type: 'last',
          page: pages - 1
        });
      }
      return data;
    };

    NavigationView.prototype.navigatePage = function(event) {
      var page;
      page = this.getTargetPage(event);
      return mediator.publish('load:page', page);
    };

    NavigationView.prototype.getTargetPage = function(event) {
      return $(event.target).data('page');
    };

    return NavigationView;

  })(View);
});
