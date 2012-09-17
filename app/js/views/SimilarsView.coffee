
define [
	'views/View'
	'views/SimilarView'
	'views/PhraseView'
	'views/MoreButtonView'
	'tpl!templates/similars.html'

], (View, SimilarView, PhraseView, MoreButtonView, similarsTemplate)->

	# todo Рендер "ещё": ЗАгрузка, можно еще, нельзя еще

	class SimilarsView extends View

		template: similarsTemplate

		className: 'similar-container'

		events:
			'click .ItemFooter': 'getMoreSimilars'
		
		
		initialize: (options)->
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
			$('.ItemDelim', @$el).append( @phraseView.el )


		renderMoreButton: ()->
			@moreButtonView.render()
			$('.ItemFooter', @$el).append( @moreButtonView.el )


		addItem: (model)->
			simView = new SimilarView( model: model )
			simView.render()
			$('.ItemSimCont', @$el).append( simView.el )	

		#------------------------------------------------

		getMoreSimilars: ()->
			@collection.getMoreSimilars()