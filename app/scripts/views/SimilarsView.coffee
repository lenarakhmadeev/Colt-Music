
define ( require )->
	$ = require( '$' )
	_ = require( '_' )
	mediator = require( 'services/mediator' )
	View = require( 'views/View' )
	SimilarView = require( 'views/SimilarView' )
	PhraseView = require( 'views/PhraseView' )
	MoreButtonView = require( 'views/MoreButtonView' )
	similarsTemplate = require( 'tpl!templates/similars.html' )


	class SimilarsView extends View

		template: similarsTemplate

		className: 'b-similars'

		initialize: ( options )->
			@collection.on( 'updated', @updateSimilars, this )

			@phraseView = new PhraseView( collection: @collection )
			@moreButtonView = new MoreButtonView( collection: @collection )


		_render: ()->
			@renderSimilars()
			@renderPhrase()
			@renderMoreButton()


		updateSimilars: ()->
			@$('.b-similars__similars-container-col1').empty()
			@$('.b-similars__similars-container-col2').empty()

			@renderSimilars()


		renderSimilars: ()->
			return if not @collection.length

			[ left, right ] = @divideModels( @collection.models )

			@renderColumn( '.b-similars__similars-container-col1', left )
			@renderColumn( '.b-similars__similars-container-col2', right )

			# По умолчанию display: none
			@$( '.b-similars__similars-container' ).show()

			# Ресайз контейнера приложения
			mediator.publish( 'app:resize' )


		renderColumn: ( columnSelector, models )->
			callback = ( model )->
				@addItem( columnSelector, model )

			_.each( models, callback, this )


		divideModels: ( models )->
			middle = Math.ceil( models.length / 2 )

			[ models[...middle], models[middle...] ]


		renderPhrase: ()->
			@phraseView.render()
			@append( '.b-similars__phrase-place', @phraseView )


		renderMoreButton: ()->
			@moreButtonView.render()
			@append( '.b-similars__more-button-place', @moreButtonView )


		addItem: ( columnSelector, model )->
			simView = new SimilarView( model: model )
			simView.render()

			# Добавляем на страницу
			@append( columnSelector, simView )


