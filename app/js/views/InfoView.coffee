
define [
	'views/View'
	'tpl!templates/info.html'

], ( View, infoTemplate )->

	'use strict'

	class InfoView extends View

		template: infoTemplate

		className: 'b-item-info'

		initialize: ( options )->
			@model.on( 'change:info', @render, this )


		serialize: ()->
			album: @model.get( 'info.album' )
			tags: ( @model.get( 'info.tags' ) or [] ).join(', ')
