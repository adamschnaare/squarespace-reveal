// Grab Data

var prayerConfig = {
    baseUrl: 'http://themill.church',
    feedUrl: 'http://themill.church/prayer-requests?&format=json-pretty',
    range: 'upcoming', // past,upcoming
    linkText: 'See Details'
};

$.ajax({
    url: prayerConfig.feedUrl, dataType: 'jsonp', success: function (data) {
        var events = data.items;
        parseEvents2(events);
    }
});

var $prayers = $('<div id="prayers" style="display:none;"></div>');

// Parse Data
function parseEvents2(events) {
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
        var content = '<div class="prayer-container"><p class="prayer">' + value.title + '<a href="' + prayerConfig.baseUrl + value.fullUrl + '">' + prayerConfig.linkText + '</a></p></div>';
        $prayers.append(content);
        //$('body').append($prayers);
        // TODO: Maybe conditionally add end date too
    });

    $prayers.prepend($('<div class="centerpoints"><h2>Prayers</h2></div>'));
    //console.log($export.html().toString());
    var $printedData2 = $('<div id="printedData2"></div>').text($prayers.html().toString());
    $('body').append($printedData2);
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




