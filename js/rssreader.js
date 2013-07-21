$.Mustache.add('rssshort', '<ul>'+
                            '{{#entries}}'+
                            '<li><a href="{{link}}" target="_blank">{{title}}</a><p class="description">{{description}}</p> </li>'+
                            '{{/entries}}'+
                            '</ul>');


$.Mustache.add('rssfull', '{{#entries}}'+
                        '<tr>'+
                        '<td>{{dc:creator}}'+
                        '<br/><span class="date">{{pubDate}}</span></span></td>'+
                        '<td>'+
                        '    <a href="{{link}}" target="_blank">{{title}}</a>'+
                        '    <br/>'+
                        '    <p class="description">{{description}}</p>'+
                        '</td>'+
                      '</tr>'+
                      '{{/entries}}');


var rssReader = {
    containers : null,

    replaceDate : function($element) {
        $element.find('.date').each(function() {
            var date = new Date($(this).html());
            var momentized = moment(date);
            $(this).html(momentized.fromNow());
        });
    },
    decode : function($element) {
        $element.find('.description').each(function() {
            var description = $(this).html();
            $(this).html(_.unescape(description));
        });
    },

    // initialization function
    init : function(selector) {
        $(selector).each(function() {
            var rssUrl = $(this).attr('rss_url');
            var num = $(this).attr('rss_num');
            var method = $(this).attr('id');

            var feed = 'http://pipes.yahoo.com/pipes/pipe.run?_id='+rssUrl+'&_render=json&limit='+num+'&_callback=rssReader.'+method;

            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('charset','utf-8');
            script.setAttribute('src',feed);
            $(selector).append(script);
        });
    },

    full_rss_version : function(data) {
        this.parse('full_rss_version',data);
    },

    last_posts : function(data) {
        this.parse('last_posts',data);
    },

    parse : function(context, data) {
        var $element = $('#'+context);
        var scriptName = $element.attr('rss_script') || 'short';
        var entries = data.value.items;
        $element.empty().mustache('rss'+scriptName, {'entries':entries});
        this.replaceDate($element);
        this.decode($element);
    }
};

$(document).ready (function() {
    rssReader.init('.post_results');
});
