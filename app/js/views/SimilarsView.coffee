
define [
	'jquery'
	'views/View'
	'views/SimilarView'
	'views/PhraseView'
	'views/MoreButtonView'
	'tpl!templates/similars.html'

], ( $, View, SimilarView, PhraseView, MoreButtonView, similarsTemplate )->

	class SimilarsView extends View

		template: similarsTemplate

		className: 'similar-container'

		events:
			'click .ItemFooter': 'getMoreSimilars'


		initialize: ( options )->
			@collection.bind( 'add', @addItem, this )

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
			@append( '.ItemDelim', @phraseView )


		renderMoreButton: ()->
			@moreButtonView.render()
			@append( '.ItemFooter', @moreButtonView )


		addItem: (model)->
			simView = new SimilarView( model: model )
			simView.render()

			@append( '.ItemSimCont', simView )


		#------------------------------------------------

		getMoreSimilars: ()->
			@collection.getMoreSimilars()