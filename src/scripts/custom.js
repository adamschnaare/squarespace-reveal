// Clean out entire page
// Initially Populate Dependency DOM Elements for reveal

// ssReveal object should be declared in the header scripts of squarespace page
if (ssReveal){
    // Declare
    ssReveal.init = function(){
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

        // Grab Data
        $.ajax({
            url: ssReveal.config.feedUrl,
            dataType: 'jsonp',
            success: function (data) {
                var events = data[ssReveal.config.range];
                parseEvents(events);
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
                    '<a href="' + ssReveal.config.baseUrl + value.fullUrl + '">' + ssReveal.config.linkText + '</a>' +
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
    };

    // Initialize
    ssReveal.init();
}





