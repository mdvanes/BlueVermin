/**
 * Created by m.van.es on 18-1-2015.
 */

(function(){
    'use strict';

    var Bsession = require('./js/domain/Bsession'),
        commands = require('./js/commands'),
        config = require('./js/config'),
        request = require('request'),
        chalk = require('chalk');

    // TODO implement up-arrow to get the last command
    // TODO relinquish prompt to user if start() completed succesfully

    var readline = require('readline'),
        rl = readline.createInterface(process.stdin, process.stdout),
        state = null,
        bsession = null;

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

    var init = function() {

        // TODO should be done with a promise or generator (e.g. Q or https://www.npmjs.com/package/request-promise)
        // TODO should be in the constructor of Bsession
        request('http://' + config.host + ':' + config.port, function(error, response) {//, body) {
            //console.log(error, response.statusCode);
            if (error || (response && response.statusCode === 404)) {
                // Logs errors, but doesn't kills the server: console.error('\n\nServer not found or not started');
                console.log(chalk.bold.red('Server not found or not started'));
                //throw new Error('Server not found or not started');
                process.exit(0);
            } else {
                bsession = new Bsession();
                bsession.createHttpSession();
                //bsession.start();
                //console.log('state3 ', bsession.state);

                // TODO instead of polling, let createHttpSession return a promise or generator?
                var testDefined = function() {
                    if(typeof bsession.state === 'undefined') {
                        //console.log('state is undefined');
                        // retry
                        setTimeout(testDefined, 1000);
                    } else {
                        console.log('state is defined'); //, bsession.state);
                        state = bsession.state;
                        rl.prompt();
                    }
                };
                testDefined();
            }
        });
    };

    // Zombie test
    //var initZombie = function() {
    //    var browser = new Browser();
    //    browser.visit('http://lap-2077:8041/server/start?project=export-Kinderbijslag&flow=Start&version=0.0-Trunk&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true')
    //        .then(function() {
    //            console.log('init body content: ', browser.text('body'));
    //            var initJson = JSON.parse(browser.text('body'));
    //            console.log(initJson.sessionId);
    //            browser.visit('http://lap-2077:8041/server/session/'+initJson.sessionId+'/api/subscribe/')
    //                .then(function() {
    //                    // TODO and here it fails because a POST is expected. Zombie can't force a POST. I would have to build an HTML form and submit it.
    //                    console.log('subscribe body content: ', browser.text('body'));
    //                });
    //            // http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/api/subscribe/
    //            // http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/api/subscribe/09b389e5-d76a-46a8-8bfd-7cb22f283722
    //        });
    //};

    //var initNew = function() {
    //    // TODO remove follow-redirects and zombie from package.json and node_modules
    //    // TODO convert to promises or generators
    //    var blueriqInitHeaders = {
    //        //'accept': 'application/json; charset=UTF-8',
    //        //'accept-encoding': 'gzip, deflate',
    //        //'accept-language': 'en-US,en;q=0.5',
    //        //'cache-control': 'no-cache',
    //        //'connection': 'keep-alive',
    //        //'content-length': '0',
    //        //'content-type': 'application/json',
    //        //'host': 'lap-2077:8041',
    //        //'pragma': 'no-cache',
    //        //'referer': 'http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/mvc/index.html'
    //    };
    //    request.get(
    //        {
    //            url: 'http://lap-2077:8041/server/start?project=export-Kinderbijslag&flow=Start&version=0.0-Trunk&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true',
    //            jar: true,
    //            headers: blueriqInitHeaders
    //        }, function(err,httpResponse,body) {
    //        //console.log('init body', body);
    //        var initJson = JSON.parse(body);
    //        console.log('sessionId_' + initJson.sessionId, initJson);
    //        request.post(
    //            {
    //                url: 'http://lap-2077:8041/server/session/'+initJson.sessionId+'/api/subscribe/',
    //                jar: true,
    //                headers: blueriqInitHeaders
    //            }, function(err, httpResponse1, body1){
    //                //console.log('subscribe: ', body1);//, httpResponse);
    //                //console.log('subscribe httpResponse:', httpResponse1.headers);
    //
    //                request.post(
    //                    {
    //                        url: 'http://lap-2077:8041/server/session/'+initJson.sessionId+'/api/subscribe/'+initJson.sessionId,
    //                        jar: true,
    //                        headers: blueriqInitHeaders
    //                    }, function(err, httpResponse2, body2) {
    //                        console.log('get page:', body2);
    //                        //console.log('get page headers:', httpResponse2.headers);
    //                    });
    //            });
    //    });
    //};

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
                    init();
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
                case 'exit':
                    console.log(chalk.black.bold.bgBlue('Have a great day!'));
                    process.exit(0);
                    break;
                default:
                    console.log('Unknown command: `' + line.trim() + '`');
                    break;
            }
            rl.prompt();
        }
    }).on('close', function() {
        // TODO how to trigger close? - pressing ctrl+c, but only in Terminal, not when running index.js from WebStorm context menu
        console.log(chalk.black.bold.bgRed('\nYou can also shut down with the \'exit\' command'));
        process.exit(0);
    });


    // TODO move to init
    console.log(chalk.blue.bold('()-().----.          .'));
    console.log(chalk.blue.bold(' \\"/` ___  ;________.\'  BlueVermin'));
    console.log(chalk.blue.bold('  ` ^^   ^^'));

    init();
    // TODO fix so cursor is at end of line
    rl.setPrompt(chalk.green('blueriq:~$ '));
    // TODO Show prompt should be in the callback of init() (or promise). Now it's also defined in Bsession.js and/or checked with a timeout
    //rl.prompt();
})();














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