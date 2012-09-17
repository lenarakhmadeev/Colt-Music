
define [
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	
], (Backbone, mediator, SimilarsCollection, proxy)->
	
	class SimilarModel extends Backbone.Model

		defaults:
			selected: false

		getTrackInfo: ()->
			return if @has( 'info' )

			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )


		getAudioUrl: ()->
			# todo
			if @has( 'audio' )
				return @trigger( 'change:audio', this, @get( 'audio' ) )

			proxy.searchAudio( @get( 'artist' ), @get( 'title' ), 0, 1 )
				.done ( data )=>
					@set( audio: data[0] )



		select: (selected)->
			@trigger( 'select', selected )


		play: ()->
			@on( 'change:audio', ()->
				mediator.publish( 'player:play', this )
				mediator.publish( 'list:current', this )

			)

			@getAudioUrl()
			




