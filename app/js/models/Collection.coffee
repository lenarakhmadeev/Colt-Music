
define [
	'backbone'

], ( Backbone )->

	'use strict'

	# Упорядоченная коллекция со своими аттрибутами
	class Collection extends Backbone.Collection

		# Переопределяем constructor, а не initialize, чтобы не вызывать super
		constructor: ()->
			super( arguments... )

			# Простая модель для хранения аттрибутов модели
			@own = new Backbone.Model()

			# Пересчитываем порядок при любом изменении коллекции
			@on( 'reset add remove', @makeModelsId, this )


		# Пересчитывает порядок моделей
		makeModelsId: ()->
			id = 1
			for model in @models
				model.set( { 'id': id++ } ) #, { silent: true } )
