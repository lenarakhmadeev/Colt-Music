
_api = new LastFm(api_key, api_url)

class @Proxy

	# todo кэширование
	# todo фейк и прямая работа с сервером
	_deferred_wrap: (request, filter)->
		dfd = $.Deferred()
		done_callback = (data, textStatus, jqXHR)->
			if 'error' of data or textStatus == 'error'
				return dfd.reject(arguments...)

			dfd.resolve(filter(arguments...))

		request().then(done_callback, dfd.reject)
		dfd.promise()

	getInfo: (artist, title)->
		request = ()-> _api.getInfo(artist, title)
		@_deferred_wrap(request, dataFilter.info)

	getSimilar: (artist, title, limit)->
		request = ()-> _api.getSimilar(artist, title, limit)
		@_deferred_wrap(request, dataFilter.similar)


	getTopTracks: (artist, limit)->
		# todo impl


	searchAudio: (artist, title, count)->
		dfd = $.Deferred()

		VK.api(
			'audio.search'
			{
				q: artist + ' - ' + title
				sort: 2
				auto_complete: 1
				count: count
			}
			()->
				l arguments
				# если ошибка то reject
				dfd.resolve(dataFilter.searchAudio(arguments...))
		)

		dfd.promise()


@_proxy = new Proxy()