
define [
	'underscore'
	'backbone'
	
], ( _, Backbone )->

	###
		Вью с наиболее общими сценариями использования
	###
	class View extends Backbone.View

		# Возвращает данные, необходимые для рендера
		serialize: ()->
			if @model
				@model.toJSON()
			else
				if @collection
					items: @collection.toJSON()
				else
					{}


		# Рендерит шаблон, который объявлен декларативно
		renderTemplate: ()->
			# Все кладем в ключ data, для удобства в шаблонизаторе
			@template( data: @serialize() ) if @template


		# Выполняет наиболее общий случай рендера
		render: ()->
			# Очищаем HTML
			@$el.children().remove()
			@$el.empty()

			# Рендерим шаблон в HTML
			@$el.html( @renderTemplate() )

			# Запускаем _render,
			# который может быть определен в потомках
			# и несет особую логику рендера
			@_render.apply(this, arguments) if _.isFunction( @_render )

			# Перепривязываем события DOM, которые определены декларативно
			@undelegateEvents()
			@delegateEvents()

			# Так принято в Backbone
			this


		# Shortcut для добавления подвью в конец
		append: ( view )->
			@$el.append( view.el )