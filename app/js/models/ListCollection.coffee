
define [
	'backbone'
	'models/ItemModel'
	'services/proxy/proxy'
	
], ( Backbone, ItemModel, proxy )->

	class ListCollection extends Backbone.Collection

		model: ItemModel

		initialize: ( models, options )->
			@on( 'reset add', @makeModelsIds, this )


		getAudio: ()->
			#todo при обновлении не ресет а адд
			proxy.getAudioList()
				.done ( data )=>
					@reset( data )


		makeModelsIds: ()->
			id = 1
			for model in @models
				model.set( 'id', id )
				id++


