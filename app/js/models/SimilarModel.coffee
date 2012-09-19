
define [
	'jquery'
	'underscore'
	'backbone'
	'services/mediator'
	'models/SimilarsCollection'
	'services/proxy/proxy'
	
], ( $, _, Backbone, mediator, SimilarsCollection, proxy )->
	
	class SimilarModel extends Backbone.Model

		defaults:
			selected: false


		getTrackInfo: ()->
			@_getTrackInfo() if not @has( 'info' )


		_getTrackInfo: ()->
			proxy.getTrackInfo( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					@set( info: data )


		getAudioUrl: ()->
			dfd = new $.Deferred()

			if @has( 'audio' )
				dfd.resolve()

			@_getAudioUrl()
				.done ()->
					dfd.resolve()

			dfd.promise()


		_getAudioUrl: ()->
			proxy.getAudioUrl( @get( 'artist' ), @get( 'title' ) )
				.done ( data )=>
					# todo Менять artist title
					audio = _.pick( data, 'aid', 'owner_id', 'url', 'duration' )

					@set( audio: audio )


		# todo !!!
		select: ( selected )->
			@trigger( 'select', selected )


		play: ()->
			@getAudioUrl()
				.done ()=>
					mediator.publish( 'player:play', this )
					mediator.publish( 'list:current', this )


		###
			artist
			title

			info:
				album
				tags
				wiki

				images

				loaded:


			audio:
				aid:
				oid:
				url

				# artist
				# title

				duration

			order
			selected



		###




