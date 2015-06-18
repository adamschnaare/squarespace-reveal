// Clean out entire page
// Initially Populate Dependency DOM Elements for reveal
$(function(){
    $('body')
        .html('')
        .append('<div class="reveal">' +
        '<div class="slides">' +
            '<section class="main">' +
                '<div class="section-inner">' +
                    '<h1>Upcoming Events</h1>' +
                '</div>' +
            '</section>' +
        '</div>' +
    '</div>');
});


// Config
var config = {
    baseUrl: 'http://themill-church.squarespace.com',
    feedUrl: 'http://themill-church.squarespace.com/events/?format=rss',
    range: 'upcoming' // past,upcoming
};

// Grab Data
$.ajax({
    url:'http://themill-church.squarespace.com/events/?format=json-pretty',
    dataType: 'jsonp',
    success: function (data) {
        var events = data[config.range];
        parseEvents(events);
        // Erase initial slide
//            $('.slides section:first').remove();
    }
});

// Parse Data
function parseEvents(events){
    $(events).each(function (key,value) {
        // Get Values
        var startDate = new Date(value.startDate);
        var endDate = new Date(value.endDate);
        var endDateText = function(){
            if (startDate.getDate() < endDate.getDate() ){
                return '<p class="toDate">To ' + formatMonth(endDate) + ' ' + endDate.getDate() + '</p>';
            }
            else {return '';}
        };

        // Append Values
        var content = '<section data-background="' + value.assetUrl + '"><div class=section-inner>' +
            '<h1>' + value.title + '</h1>' +
            '<div class="calendar">' +
            '<div class="row">' +
            '<div class="calendar-inner">' +
            '<p class="month">' + formatMonth(startDate) + '</p>' +
            '<p class="day">' + startDate.getDate() + '</p>' +
            endDateText() +
            '</div>' +
            '</div>' +

            '<div class="time">' +
            '<h4>' + formatAMPM(startDate) + '</h4>' +
            '</div>' +
            '</div>' +

            value.excerpt +
            '<a href="' + config.baseUrl + value.fullUrl + '">' + value.title + '</a>' +
            '</div></section>';
        $('.slides').append(content);

        // TODO: Maybe conditionally add end date too
    });

    // Full list of configuration options available here:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        autoSlide: 5000,
        loop: true,
        transition: Reveal.getQueryHash().transition || 'slide', // default/cube/page/concave/zoom/linear/fade/none
        backgroundTransition: 'slide',
        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme

        // Optional libraries used to extend on reveal.js
        dependencies: [
            { src: 'bower_components/reveal-js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'bower_components/reveal-js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'bower_components/reveal-js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'bower_components/reveal-js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'bower_components/reveal-js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'bower_components/reveal-js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
    });

}
function formatAMPM(d) {
    var minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'p' : 'a';

    if(hours > 12){hours = hours-12}
    if (typeof hours == 'string'){
        while(hours.charAt(0) === '0')
            hours = hours.substr(1);
    }
    return hours + ':' + minutes + ampm;
}
function formatDay(d) {
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[d.getDay()];
}
function formatMonth(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()];
}