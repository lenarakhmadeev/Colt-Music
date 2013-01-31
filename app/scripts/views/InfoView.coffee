
define ( require ) ->
	View = require( 'views/View' )
	infoTemplate = require( 'tpl!templates/info.html' )


	class InfoView extends View

		template: infoTemplate

		className: 'b-item-info'

		initialize: ( options ) ->
			@model.on( 'change:info', @render, this )


		serialize: ->
			album: @model.get( 'info.album' )
			tags: ( @model.get( 'info.tags' ) or [] ).join(', ')
