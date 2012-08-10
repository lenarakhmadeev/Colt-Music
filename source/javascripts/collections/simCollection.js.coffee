
class @SimCollection extends Backbone.Collection

	# получать сразу все реком, выдавать пачками
	# если реком мало, то запрос топа артиста

	model: SimModel
	rawModels: []
	limitStep: 2
	limit: 0
	wait: false

	initialize: (@artist, @title)->

	getMoreSimilar: ()=>
		l 'SimCollection.getMoreSimilar', arguments

		if @wait
			return

		@wait = true
		@limit += @limitStep
		_proxy.getSimilar(@artist, @title, @limit)
			.done((data)=>
				@wait = false
				@add(data.slice(@limit - @limitStep))
			)


