
class @ItemView extends Backbone.View
	itemTpl: compileTemplate('#item-tpl')
	infoTpl: compileTemplate('#item-info-tpl')
	similarTpl: compileTemplate('#item-sim-tpl')

	# todo пока грузятся рекомендации заморозить кнопку еще

	initialize: ()->
		l 'ItemView.initialize', arguments

		@render()
		@model.bind('change:info', @renderInfo)
		@model.bind('change:selected', @renderSelected)
		@model.similar.bind('add', @renderSimilar)

		@delegateEvents(
			'click .footer': @model.similar.getMoreSimilar
		)

		@model.similar.getMoreSimilar()
		@model.getInfo()

	render: ()=>
		l 'ItemView.renderItem', arguments

		tpl_data =
			artist: @model.get('artist')
			title: @model.get('title')

		@$el.html(@itemTpl(tpl_data))

		$('.phrase', @$el).html(randomElem(no_phrases))

	renderInfo: (model, data, changes)=>
		l 'ItemView.renderInfo', arguments

		$('.header .cover img', @$el).attr('src', data.album_cover)
		$('.item-buttons', @$el).append(@infoTpl(data))


	renderSelected: (model, data, changes)=>
		l 'ItemView.renderSelect', arguments

		# todo impl

	renderSimilar: (model, collecton, WHAT)=>
		l 'ItemView.renderSimilar', arguments

		simView = new SimView(model: model)
		$('.simCont', @$el).append(simView.el)

		$('.phrase', @$el).html(randomElem(yes_phrases))



	play: ()=>


	showInfo: ()=>

	addToWall: ()=>
		# todo delete, edit
