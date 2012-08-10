
class @AppView extends Backbone.View

	initialize: ()->


	renderCollection: (collection)=>
		l 'render', arguments
		collection.each(@renderItem)

	renderItem: (item)=>

		l item.get('artist')

		view = new ItemView(model: item)


		@$el.append(view.el)
