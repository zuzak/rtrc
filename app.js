var app = require( 'http' ).createServer( handler );
var io = require( 'socket.io' ).listen( app );
var irc = require( 'irc' );
var fs = require( 'fs' );
var rc = new irc.Client( 'irc.wikimedia.org', 'wikithanks' + Math.floor( Math.random() * 100 ) , {
    channels: [
        '#de.wikipedia',
        '#en.wikipedia',
        '#es.wikipedia',
        '#fr.wikipedia',
        '#it.wikipedia',
        '#ja.wikipedia',
        '#pl.wikipedia',
        '#pt.wikipedia',
        '#ru.wikipedia',
        '#zh.wikipedia'
    ]
} );

//rc.join( '#en.wikipedia' );

app.listen( 3005 );

rc.addListener( 'message', function ( nick, to, text, message ) {
    // \u00034 create\u000310 
    /*
    if ( text.match( /\u00034 [a-z]+\u000310/ ) ) {
        process.stdout.write( '!' );
    } else {
        process.stdout.write( '.' );
    }
    */
    io.sockets.emit( 'edit', {
        'lang' : to.substr( 1, 2 )
    } );
} )

function handler( req, res ) {
    fs.readFile( __dirname + '/index.html',
        function ( err, data ) {
            if ( err ) {
                res.writeHead( 500 );
                return res.end( 'Unable to load index page' );
            }
            res.writeHead( 200 );
            res.end( data );
        }
    )
}
