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
    version = '0.0-Wetwijziging',
    state = null;

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
            // TODO stub
            var stub = '{"elements":[{"key":"P960","name":"AanvragenKinderbijslag","properties":{},"children":["P960-C0","P960-C1","P960-C2","P960-C3"],"displayName":"Aanvragen kinderbijslag","contentStyle":"page","messages":[],"type":"page","styles":[]},{"key":"P960-C2-C0_T","name":null,"properties":{},"children":[],"displayName":null,"contentStyle":"table","type":"container","styles":[]},{"key":"P960-C1-F0","name":"Verzekerde.Voornaam","properties":{},"questionText":"Voornaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-C0-C0","name":"GeenKinderen","properties":{},"children":["P960-C2-C0-C0-TI0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1","name":"Verzekerde","properties":{},"children":["P960-C1-F0","P960-C1-F1","P960-C1-F2","P960-C1-F3","P960-C1-F4","P960-C1-F5","P960-C1-F6","P960-C1-F7"],"displayName":"Gegevens verzekerde","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C2","name":"Aanvraag","properties":{},"children":["P960-C2-C0","P960-C2-B1"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C3","name":null,"properties":{},"children":["P960-C3-B0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C0-TI0","name":"BerekenHoogteKinderbijslag","properties":{},"nodes":[{"text":"Met de kinderbijslag betaalt de overheid mee aan de kosten die horen bij de opvoeding van een kind. Woont of werkt u in Nederland en heeft u kinderen jonger dan 18 jaar, dan krijgt u waarschijnlijk kinderbijslag. Hoeveel kinderbijslag u krijgt is o.a. afhankelijk van de leeftijd van uw kind. Wilt u weten hoeveel kinderbijslag u krijgt? Maak dan een proefberekening.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C2-C0-C0-TI0","name":"GeenKinderen","properties":{},"nodes":[{"text":"Er zijn (nog) geen kinderen aanwezig.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C1-F3","name":"Verzekerde.Adres","properties":{},"questionText":"Adres","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F4","name":"Verzekerde.Postcode","properties":{},"questionText":"Postcode","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F1","name":"Verzekerde.Achternaam","properties":{},"questionText":"Achternaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F2","name":"Verzekerde.Geslacht","properties":{},"questionText":"Wat is uw geslacht?","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Man","value":"Man"},{"displayValue":"Vrouw","value":"Vrouw"}],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F7","name":"Verzekerde.BankGiroRekeningNummer","properties":{},"questionText":"Bank/giro rekeningnummer","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-B1","name":"Nieuw","properties":{},"disabled":false,"refresh":false,"caption":"Kind toevoegen","type":"button","styles":[]},{"key":"P960-C2-C0","name":"Kinderen","properties":{},"children":["P960-C2-C0_T","P960-C2-C0-C0"],"displayName":"Kinderen","contentStyle":"instance_selector","type":"container","styles":[]},{"key":"P960-C3-B0","name":"Bereken","properties":{},"disabled":false,"refresh":false,"caption":"Bereken kinderbijslag","type":"button","styles":[]},{"key":"P960-C1-F5","name":"Verzekerde.Woonplaats","properties":{},"questionText":"Woonplaats","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C0","name":"Infobanner","properties":{},"children":["P960-C0-TI0"],"displayName":"Proefberekening kinderbijslag","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1-F6","name":"Verzekerde.Land","properties":{},"questionText":"Land","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Nederland","value":"Nederland"},{"displayValue":"België","value":"Belgie"},{"displayValue":"Duitsland","value":"Duitsland"},{"displayValue":"Frankrijk","value":"Frankrijk"},{"displayValue":"Spanje","value":"Spanje"},{"displayValue":"Portugal","value":"Portugal"},{"displayValue":"Turkije","value":"Turkije"},{"displayValue":"Zwitserland","value":"Zwitserland"},{"displayValue":"Overig","value":"Overig"}],"messages":[],"values":[],"type":"field","styles":[]}],"language":{"patterns":{"datetime":"dd-mm-yyyy hh:mm:ss","date":"dd-mm-yyyy"},"languageCode":"nl-NL"}}';
            try {
                var parsed = JSON.parse(stub);
                console.log('parsed: ', parsed);
                state = new State(parsed);
                console.log('stub loaded');
                rl.prompt();
                //subscribe(parsed.sessionId);
            } catch(e) {
                console.error('could not parse');
            }

            //console.log('end: ', data, typeof data);
            //setTimeout(function() {
            //    if(!data) {
            //        console.error('data is empty');
            //    } else {
            //        try {
            //            var parsed = JSON.parse(data);
            //            console.log('parsed: ', parsed);
            //            //subscribe(parsed.sessionId);
            //        } catch(e) {
            //            console.error('could not parse');
            //        }
            //    }
            //}, 1000);
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
            }, 100);
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
                    }, 100);
                } catch(e) {
                    console.error('could not parse');
                }
            }
        });
    };

    http.request(options, callback).end();
};

var State = function(modelJson) {
    this.model = modelJson;

    this.questions = this.prepareQuestions();
};
State.prototype.prepareQuestions = function() {
    var questions = [];
    //console.log(this.model.elements.length);
    var elements = this.model.elements;
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].questionText) {
            questions.push(elements[i]);
        }
    }
    return questions;
};
State.prototype.getQuestions = function() {
    //var questions = [];
    ////console.log(this.model.elements.length);
    //var elements = this.model.elements;
    //for(var i = 0; i < elements.length; i++) {
    //    if(elements[i].questionText) {
    //        questions.push(elements[i]);
    //    }
    //}
    return this.questions;
};
State.prototype.isReady = function() {
    return this.model;
};

var look = function() {
    if(state.isReady) {
        var questions = state.getQuestions();
        //console.log(questions.length);
        console.log('I have ' + questions.length + ' questions for you:');
        for(var i = 0; i < questions.length; i++) {
            var question = questions[i];
            console.log(i + ')', question.questionText);
        }
    } else {
        console.error('First run "start"!');
    }
};

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

var help = function() {
    console.log('help for Blueriq CLI');
    console.log('start - initialize session');
    console.log('ls (or look) - show all questions');
    console.log('answer n - answer question n');
    console.log('answer all - answer all questions, starting with the first and automatically continuing until all are answered.')
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
                start();
                break;
            case 'look':
                look();
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
                help();
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