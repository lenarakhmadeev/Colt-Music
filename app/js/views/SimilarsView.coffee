
define [
	'jquery'
	'views/View'
	'views/SimilarView'
	'views/PhraseView'
	'views/MoreButtonView'
	'tpl!templates/similars.html'

], ( $, View, SimilarView, PhraseView, MoreButtonView, similarsTemplate )->

	'use strict'

	class SimilarsView extends View

		template: similarsTemplate

		className: 'b-similars'

		events:
			'click .b-similars__more-button': 'getMoreSimilars'


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
			@append( '.b-similars__phrase', @phraseView )


		renderMoreButton: ()->
			@moreButtonView.render()
			@append( '.b-similars__more-button', @moreButtonView )


		addItem: (model)->
			simView = new SimilarView( model: model )
			simView.render()

			@append( '.b-similars__similars-container', simView )


		#------------------------------------------------

		getMoreSimilars: ()->
			@collection.getMoreSimilars()