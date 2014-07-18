define(
	['jquery', 'underscore', 'async', 'moment', 'Handlebars'], 
	function($, _, async, moment, Handlebars) {

	var crossOriginFeedParserUrl = function(limit, feedUrl) {
		return document.location.protocol + 
			'//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+
			limit+
			'&callback=?&q=' + 
			encodeURIComponent(feedUrl);
	},

	doAggregate = function(limit, target, feedUrl, callback) {
		$.ajax({
		    url: crossOriginFeedParserUrl(limit, feedUrl),
		    dataType: 'json',
		    success: function(data) {
		    	callback(null, data.responseData.feed.entries);
		    }
	  	});
	},

	sanitizeEntries = function(limit, entries) {
		return _.sortBy(
				_.filter(
					_.union.apply(_, entries),
					function (entry) {
						return entry.author !== 'Mathilde';
					}
				),
				function (entry) {
					return -1 * moment(entry.publishedDate).unix();
				}
			).slice(0, limit);	
	},

	mergeEntries = function(postSkeleton, entries) {
		var template = Handlebars.compile(postSkeleton);

		return _.map(entries, function(entry) {
				return template({
					author: entry.author,
					contents: entry.contentSnippet,
					date: moment(entry.publishedDate).fromNow(),
					url: entry.link,
					title: entry.title
				});
			});
	},

	updateContents = function (limit, target, postSkeleton, error, success) {
		var entries = sanitizeEntries(limit, success),
			feeds = mergeEntries(postSkeleton, entries);

		$(target).html(feeds);
	};


	return {
		aggregate: function(feedUrls, limit, target, postTemplate) {
			async.map(
				feedUrls, 
				_.partial(doAggregate, limit, target), 
				_.partial(updateContents, limit, target, postTemplate)
			);
		}
	}
});