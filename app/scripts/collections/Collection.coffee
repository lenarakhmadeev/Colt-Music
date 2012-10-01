
define [
	'backbone'

], ( Backbone )->

	'use strict'

	# Упорядоченная коллекция со своими аттрибутами
	class Collection extends Backbone.Collection

		# Переопределяем constructor, а не initialize, чтобы не вызывать super
		constructor: ()->
			# Простая модель для хранения аттрибутов модели
			@own = new Backbone.Model()

			# Пересчитываем порядок при любом изменении коллекции
			@on( 'reset add remove', @recalculateIds, this )

			# Вызываем "родной" конструктор
			super( arguments... )


		# Пересчитывает порядок моделей
		recalculateIds: ()->
			id = 1
			for model in @models
				model.set( { 'id': id++ }, { silent: true } )

			# Вызываем соответствующее событие
			@trigger( 'recalculated' )
