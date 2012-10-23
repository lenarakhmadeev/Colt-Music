
define ( require )->
	$ = require( 'jquery' )
	mediator = require( 'services/mediator' )
	View = require( 'views/View' )
	SimilarView = require( 'views/SimilarView' )
	PhraseView = require( 'views/PhraseView' )
	MoreButtonView = require( 'views/MoreButtonView' )
	similarsTemplate = require( 'tpl!templates/similars.html' )

	'use strict'

	class SimilarsView extends View

		template: similarsTemplate

		className: 'b-similars'

		initialize: ( options )->
			@collection.on( 'add', @addItem, this )

			@phraseView = new PhraseView( collection: @collection )
			@moreButtonView = new MoreButtonView( collection: @collection )


		_render: ()->
			@renderSimilars()
			@renderPhrase()
			@renderMoreButton()


		renderSimilars: ()->
			@collection.each( @addItem, this )


		renderPhrase: ()->
			@phraseView.render()
			@append( '.b-similars__phrase-place', @phraseView )


		renderMoreButton: ()->
			@moreButtonView.render()
			@append( '.b-similars__more-button-place', @moreButtonView )


		addItem: ( model )->
			simView = new SimilarView( model: model )
			simView.render()

			# Добавляем на страницу
			@append( '.b-similars__similars-container', simView )

			# По умолчанию display: none
			@$( '.b-similars__similars-container' ).show()

			mediator.publish( 'app:resize' )
