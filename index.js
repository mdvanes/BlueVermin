/**
 * Created by m.van.es on 18-1-2015.
 */

(function(){
    'use strict';

    // TODO implement up-arrow to get the last command

    var Bsession = require('./js/domain/Bsession'),
        State = require('./js/domain/State'),
        commands = require('./js/commands'),
        chalk = require('chalk'),
        readline = require('readline'),
        rl = readline.createInterface(process.stdin, process.stdout),
        state = null,
        bsession = null,
        config = require('./js/config');

    var printLogo = function() {
        console.log(chalk.blue.bold('()-().----.          .'));
        console.log(chalk.blue.bold(' \\"/` ___  ;________.\'  Running the BlueVermin game engine'));
        console.log(chalk.blue.bold('  ` ^^   ^^'));
    };

    // TODO test multilang

    var init = function() {
        bsession = new Bsession();
        var pageObjPromise = bsession.createHttpSession();
        pageObjPromise.then(function(modelJson) {
            //console.log('deferred promise chain' + response, response);
            state = new State(modelJson, bsession);
            //console.log('pageObj/state is defined');
            printLogo();

            // TODO automatically generate ASCII art header/rainbow colors;
            // TODO use pagedisplayname or config: if pagedisplayname also include WELCOME TO so it can be made multilingual
            console.log('WELCOME TO %s', config.project.toUpperCase());

            state.printTextItems(); // Current situation of the game is stored in a text-item
            state.askQuestion(); // Ask the current question, i.e. display question text for the only field on the current page

            rl.on('line', function(line) {
                commands.run(line, rl, state);
            }).on('close', function() {
                // TODO how to trigger close? - pressing ctrl+c, but only in Terminal, not when running index.js from WebStorm context menu
                console.log(chalk.black.bold.bgRed('\nYou can also shut down with the \'exit\' command'));
                process.exit(0);
            });
            rl.setPrompt(chalk.green('>> '));//'blueriq:~$ ')); // TODO change the prompt text to questiontext of the field?
            rl.prompt();
        }).catch(function(error){
            console.error(chalk.bold.red(error));
            process.exit(0);
        });
    };

    init();
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
//app.use('/edo', express.static(path.join(__dirname, '/theme')));
//app.use('/', express.static(path.join(__dirname, '/_resources')));
//
//// Provide dir listing of /stubs
//app.use('/', serveIndex('_resources', {'icons': true}));
//

//customizeTheme.customize(
//    defaultPrimary,
//    defaultSecondary,
//    function() {
//        var server = app.listen(3000, function () {
//            var host = server.address().address;
//            var port = server.address().port;
//
//        });
//    }
//);