
define ( require ) ->
	$ = require( '$' )
	mediator = require( 'services/mediator' )
	View = require( 'views/View' )
	navigationTemplate = require( 'tpl!templates/navigation.html' )


	class NavigationView extends View

		template: navigationTemplate

		className: 'b-navigation'

		events:
			'click .b-navigation__first': 'navigatePage'
			'click .b-navigation__prev': 'navigatePage'
			'click .b-navigation__item': 'navigatePage'
			'click .b-navigation__next': 'navigatePage'
			'click .b-navigation__last': 'navigatePage'


		initialize: ( options ) ->
			@collection.own.on( 'change:content', @render, this )


		serialize: ->
			page = @collection.own.get( 'page' )
			pages = @collection.pagesCount()

			data =
				pages: []

			data.pages.push( type: 'first', page: 0 ) if page
			data.pages.push( type: 'prev', page: page - 1 ) if page

			data.pages.push( type: 'num', page: page - 10 ) if page - 10 > -1
			data.pages.push( type: 'space') if page - 10 > -1

			data.pages.push( type: 'num', page: page - 3 ) if page - 3 > -1
			data.pages.push( type: 'num', page: page - 2 ) if page - 2 > -1
			data.pages.push( type: 'num', page: page - 1 ) if page - 1 > -1 
			data.pages.push( type: 'cur_num', page: page) if page?
			data.pages.push( type: 'num', page: page + 1 ) if page + 1 < pages
			data.pages.push( type: 'num', page: page + 2 ) if page + 2 < pages
			data.pages.push( type: 'num', page: page + 3 ) if page + 3 < pages

			data.pages.push( type: 'space') if page + 10 < pages
			data.pages.push( type: 'num', page: page + 10 ) if page + 10 < pages

			data.pages.push( type: 'next', page: page + 1 ) if pages > (page + 1)
			data.pages.push( type: 'last', page: pages - 1 ) if pages > (page + 1)

			data


		navigatePage: ( event ) ->
			page = @getTargetPage( event )
			mediator.publish( 'list:load_page', page)


		getTargetPage: ( event ) ->
			$( event.target ).data( 'page' )





