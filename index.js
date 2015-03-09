/**
 * Created by m.van.es on 18-1-2015.
 */

'use strict';

var Bsession = require('./js/domain/Bsession');
//var State = require('./js/domain/State');
var commands = require('./js/commands');

// TODO implement up-arrow to get the last command
// TODO relinquish prompt to user if start() completed succesfully

//var http = require('http');
//var http = require('follow-redirects').http;
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    //host = 'lap-2077',
    //port = '8041',
    //project = 'export-Kinderbijslag',
    //flow = 'Start',
    //version = '0.0-Trunk', //'0.0-Wetwijziging',
    state = null,
    bsession = null;

// TODO to State? or wrapper around State?
//var look = function() {
//    if(state.isReady) {
//        var questions = state.getQuestions();
//        //console.log(questions.length);
//        console.log('I have ' + questions.length + ' questions for you:');
//        for(var i = 0; i < questions.length; i++) {
//            var question = questions[i];
//            console.log(i + ')', question.questionText);
//        }
//    } else {
//        console.error('First run "start"!');
//    }
//};

// TODO to State? or wrapper around State?
var answer = function(answerIndex) {
    if(state.isReady()) {
        //console.log(state.getQuestions()[answerIndex].questionText);
        rl.question(state.getQuestions()[answerIndex].questionText + '? ', function(answer) {
            console.log('> You answered ' + answer);
            rl.prompt();
        });
    } else {
        console.error('First run "start"!');
    }
};

// TODO to State? or wrapper around State?
var review = function() {
    if(state.isReady) {
        var questions = state.getQuestions();
        //console.log(questions.length);
        console.log('I have ' + questions.length + ' questions for you:');
        for(var i = 0; i < questions.length; i++) {
            var question = questions[i];
            console.log(i + ')', question.questionText + ' => ' + question.values[0]);
        }
    } else {
        console.error('First run "start"!');
    }
};

// TODO fix so cursor is at end of line
rl.setPrompt('blueriq:~$ ');
rl.prompt();

rl.on('line', function(line) {
    if(line.trim().indexOf('answer') === 0) {
        var param = line.trim().split(' ');
        //console.log('answer ' + param[1]);
        answer(param[1]);
        //rl.prompt();
    } else {
        switch(line.trim()) {
            case 'hello':
                console.log('world!');
                break;
            case 'start':
                //Bsession.start();
                bsession = new Bsession();
                bsession.start();
                console.log('state3 ', bsession.state);

                var testDefined = function() {
                    if(typeof bsession.state === 'undefined') {
                        console.log('state is undefined');
                        // retry
                        setTimeout(testDefined, 1000);
                    } else {
                        console.log('state is defined', bsession.state);
                        state = bsession.state;
                        rl.prompt();
                    }
                };
                testDefined();

                break;
            case 'look':
                state.look();
                break;
            case 'answer':
                answer(0);
                break;
            case 'next': // next page
                break;
            case 'review':
                review();
                break;
            case 'help':
                commands.help();
                break;
            default:
                console.log('Unknown command: `' + line.trim() + '`');
                break;
        }
        rl.prompt();
    }
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