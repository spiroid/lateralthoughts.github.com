define(['jquery'], function($) {

	var endsWith = function(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};

	return {
		/**
		 * Patchy attempt to add .html to all relevant hyperlinks
		 * so the website is locally browsable
		 */
		htmlifyLinks: function() {
			$('a').each(function(index, link) {
				var $link = $(link),
					url = $link.attr('href');

				if (url.indexOf('/') === 0 && !endsWith(url, '/')) {
					$link.attr('href', url + '.html');
				}
			})
		}
	};
});