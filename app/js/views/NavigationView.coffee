
define [
	'jquery'
	'mediator'
	'views/View'
	'tpl!templates/navigation.html'
	
], ($, mediator, View, navigationTemplate)->

	class NavigationView extends View

		template: navigationTemplate

		className: 'Navigation'

		events:
			'click .NavFirst, .NavPrev, .NavItem, .NavNext, .NavLast': 'navigatePage'


		initialize: (options)->
			

		serialize: ()->
			page = @model.get( 'page' )
			pages = @model.pagesCount()

			data =
				pages: []

			data.pages.push( type: 'first', page: 0 ) if page
			data.pages.push( type: 'prev', page: page - 1 ) if page

			data.pages.push( type: 'num', page: page - 10 ) if page - 10 > -1
			data.pages.push( type: 'space') if page - 10 > -1

			data.pages.push( type: 'num', page: page - 2 ) if page - 2 > -1
			data.pages.push( type: 'num', page: page - 1 ) if page - 1 > -1 
			data.pages.push( type: 'cur_num', page: page)
			data.pages.push( type: 'num', page: page + 1 ) if page + 1 < pages
			data.pages.push( type: 'num', page: page + 2 ) if page + 2 < pages

			data.pages.push( type: 'space') if page + 10 < pages
			data.pages.push( type: 'num', page: page + 10 ) if page + 10 < pages

			data.pages.push( type: 'next', page: page + 1 ) if pages > (page + 1)
			data.pages.push( type: 'last', page: pages - 1 ) if pages > (page + 1)

			data


		navigatePage: (event)->
			page = @getTargetPage( event )
			mediator.publish( 'load:page', page)


		getTargetPage: (event)->
			$(event.target).data('page')





