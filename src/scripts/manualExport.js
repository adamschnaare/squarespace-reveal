// Grab Data

var eventsConfig = {
    baseUrl: 'http://themill.church',
    feedUrl: 'http://themill.church/events/?category=All+Church,Stratford&format=json-pretty',
    range: 'upcoming', // past,upcoming
    linkText: 'See Details'
};

$.ajax({
    url: eventsConfig.feedUrl, dataType: 'jsonp', success: function (data) {
        var events = data[eventsConfig.range];
        parseEvents(events);
    }
});

var $export = $('<div id="export" style="display:none;"></div>');

// Parse Data
function parseEvents(events) {
    $(events).each(function (key, value) {
        // Get Values
        var startDate = new Date(value.startDate);
        var endDate = new Date(value.endDate);
        var endDateText = function () {
            if (startDate.getDate() < endDate.getDate()) {
                return '<p class="toDate">To ' + formatMonth(endDate) + ' ' + endDate.getDate() + '</p>';
            } else {
                return '';
            }
        };

        // Append Values
        var content = '<div class="ssExport">' +
            '<div class="section">' +
            '<img src="' + value.assetUrl + '">' +
                '<div class=section-inner>' +
                    '<h3 class="title">' + value.title + '</h3>' +
                    '<div class="calendar">' +
                        '<div class="row">' +
                            '<div class="calendar-inner">' +
                                '<p class="month">' + formatMonth(startDate) + '</p>' +
                                '<p class="day">' + startDate.getDate() + '</p>' +
                                endDateText() +
                            '</div>' +
                        '</div>' +
                        '<div class="time">' +
                            '<p>' + formatAMPM(startDate) + '</p>' +
                        '</div>' +
                    '</div>' +
                    value.excerpt +
                    '<a href="' + eventsConfig.baseUrl + value.fullUrl + '">' + eventsConfig.linkText + '</a>' +
                '</div>' +
            '</div>' +
            '</div>';
        $export.append(content);
        //$('body').append($export);
        // TODO: Maybe conditionally add end date too
    });
    $export.prepend($('<div class="centerpoints"><h2>Upcoming Events</h2></div>'));

    //console.log($export.html().toString());
    var $printedData = $('<div id="printedData"></div>').text($export.html().toString());
    $('body').append($printedData);
}
function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Cmd+C(Apple) / Ctrl+C(PC), Enter", text);
}
function formatAMPM(d) {
    var minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(), hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(), ampm = d.getHours() >= 12 ? 'p' : 'a';

    if (hours > 12) {
        hours = hours - 12
    }
    if (typeof hours == 'string') {
        while (hours.charAt(0) === '0')
            hours = hours.substr(1);
    }
    return hours + ':' + minutes + ampm;
}
function formatDay(d) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()];
}
function formatMonth(d) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()];
}




