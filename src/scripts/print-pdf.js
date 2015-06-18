<!-- If the query includes 'print-pdf', include the PDF print sheet -->
if( window.location.search.match( /print-pdf/gi ) ) {
    var link = document.createElement( 'link' );
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'bower_components/reveal-js/css/print/pdf.css';
    document.getElementsByTagName( 'head' )[0].appendChild( link );
}