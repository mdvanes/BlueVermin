/**
 * Created by m.van.es on 18-1-2015.
 */

'use strict';

// TODO implement up-arrow to get the last command
// TODO relinquish prompt to user if start() completed succesfully

//var http = require('http');
var http = require('follow-redirects').http;
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    host = 'lap-2077',
    port = '8041',
    project = 'export-Kinderbijslag',
    flow = 'Start',
    version = '0.0-Wetwijziging';

// TODO wow such callback, much hell
// TODO should be in a module
var getModel = function(sessionId) {
    //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscription/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/handleEvent
    //sessionId = 'bf29c26d-4fb2-4be5-90d0-0fc9698cf66c';
    //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscribe/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c
    var options = {
        host: host,
        port: port,
        path: '/server/session/' + sessionId + '/api/subscribe/' + sessionId,
        //path: '/server/session/' + sessionId + '/api/subscription/' + sessionId + '/handleEvent',
        method: 'POST'
    };

    console.log('getModel options: ', options);

    var callback = function(response) {
        var data = '';
        response.on('data', function(chunk) {
            //console.log('data', chunk);
            data += chunk;
        });
        response.on('end', function() {
            console.log('end: ', data, typeof data);
            setTimeout(function() {
                if(!data) {
                    console.error('data is empty');
                } else {
                    try {
                        var parsed = JSON.parse(data);
                        console.log('parsed: ', parsed);
                        //subscribe(parsed.sessionId);
                    } catch(e) {
                        console.error('could not parse');
                    }
                }
            }, 1000);
        });
    };

    http.request(options, callback).end();
};
var subscribe = function(sessionId) {
    //http://localhost:8080/war/server/session/subscriptionId/api/subscribe
    var options = {
        host: host,
        port: port,
        path: '/server/session/' + sessionId + '/api/subscribe/',
        method: 'POST'
    };

    console.log('subscribe options: ', options, '\nhttp://' + options.host + ':' + options.port + options.path);

    var callback = function(response) {
        var data = '';
        response.on('data', function(chunk) {
            //console.log('data', chunk);
            data += chunk;
        });
        response.on('end', function() {
            console.log('end: ', data, typeof data);
            setTimeout(function() {
                getModel(sessionId)
            }, 1000);
            //if(!data) {
            //    console.error('data is empty');
            //} else {
            //    try {
            //        var parsed = JSON.parse(data);
            //        console.log('parsed: ', parsed);
            //        //subscribe(parsed.sessionId);
            //    } catch(e) {
            //        console.error('could not parse');
            //    }
            //}
        });
    };

    http.request(options, callback).end();
};
var start = function() {
    //console.log('start: ');

    var options = {
        host: host,
        port: port,
        path: '/server/start?project=' + project +
            '&flow=' + flow +
            '&version=' + version + '&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true'
    };


    console.log('init options: ', options);

    var callback = function(response) {
        var data = '';
        response.on('data', function(chunk) {
            //console.log('data', chunk);
            data += chunk;
        });
        response.on('end', function() {
            //console.log('end: ', data, typeof data);
            if(!data) {
                console.error('data is empty');
            } else {
                try {
                    var parsed = JSON.parse(data);
                    console.log('sessionId: ', parsed.sessionId);
                    setTimeout(function() {
                        subscribe(parsed.sessionId)
                    }, 1000);
                } catch(e) {
                    console.error('could not parse');
                }
            }
        });
    };

    http.request(options, callback).end();
};

var help = function() {
    console.log('help for Blueriq CLI');
    console.log('start - initialize session');
    console.log('ls (or show) - show all questions')
};

// TODO fix so cursor is at end of line
rl.setPrompt('blueriq:~$ ');
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        case 'start':
            start();
            break;
        case 'look':
            break;
        case 'next':
            break;
        case 'review':
            break;
        case 'help':
            help();
            break;
        default:
            console.log('Unknown command: `' + line.trim() + '`');
            break;
    }
    rl.prompt();
}).on('close', function() {
    // TODO how to trigger close?
    console.log('Have a great day!');
    process.exit(0);
});


//var express = require('express')
//var app = express()
//
//
//var readline = require('readline');
//
//var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});
//
//rl.question("What do you think of node.js? ", function(answer) {
//    // TODO: Log the answer in a database
//    console.log("Thank you for your valuable feedback:", answer);
//
//    rl.close();
//});


//app.get('/', function (req, res) {
//    res.send('Hello World!')
//})
//
//var server = app.listen(3000, function () {
//
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log('Example app listening at http://%s:%s', host, port)
//
//});



//var express = require('express'),
//    path = require('path'),
//    app = express(),
//    serveIndex = require('serve-index');
//
//// Intercept form submit
//app.use('/customizeTheme', function (req, res) {
//    // Fire-and-forget
//    customizeTheme.customize(
//        req.query.primary,
//        req.query.secondary,
//        function() {
//            customizeTheme.sendResponse(res);
//        }
//    );
//});
//
//// Redirect contents of e.g. /css to correct file on fs
//app.use('/eco', express.static(path.join(__dirname, '/theme')));
//app.use('/', express.static(path.join(__dirname, '/_resources')));
//
//// Provide dir listing of /stubs
//app.use('/', serveIndex('_resources', {'icons': true}));
//
//console.log('ECO Theme Customizer running initial compilation...');
//customizeTheme.customize(
//    defaultPrimary,
//    defaultSecondary,
//    function() {
//        var server = app.listen(3000, function () {
//            var host = server.address().address;
//            var port = server.address().port;
//
//            console.log('ECO Theme Customizer app listening at http://%s:%s', host, port);
//        });
//    }
//);