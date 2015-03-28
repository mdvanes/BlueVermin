(function() {
    'use strict';

    var config = require('../config');
    var http = require('follow-redirects').http;
    var State = require('./State');
    //var request = require('request');
    //var Browser = require('zombie');

    // Blueriq Session initializer / Blueriq SessionController?
    var Bsession = function() {//state, rl) {
        //this.state = state;
        //this.rl = rl;
    };

    // TODO wow such callback, much hell
    // TODO should be in a module
    /* TODO
    in core.js, this is in blueriq.models.SessionModel.
    there is a function changeSubscription = context.session.subscribe

    it makes a new SessionController
    it does session.getPage

     this.subscribe = function subscribe  blueriq.SessionService#subscribe

     POST /server/session/848cf9d9-f423-4304-974d-f47acda7464b/api/subscribe/848cf9d9-f423-4304-974d-f47acda7464b HTTP/1.1
     Host: lap-2077:8041
     User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0
     Accept: application/json; charset=UTF-8
     Accept-Language: en-US,en;q=0.5
     Accept-Encoding: gzip, deflate
     Content-Type: application/json
     X-Requested-With: XMLHttpRequest
     Referer: http://lap-2077:8041/web-resources/18b48b04-7b823322/portal2.html
     Cookie: AquimaWidgetSettings=e949dc64-9513-4964-a8ba-bc93d4736a3c; JSESSIONID=fqn0rdx9pc3c12mrc95fy9r74
     Connection: keep-alive
     Pragma: no-cache
     Cache-Control: no-cache
     Content-Length: 0



     */
    Bsession.prototype.getModel = function(headers, sessionId) {
        var self = this;
        //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscription/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/handleEvent
        //sessionId = 'bf29c26d-4fb2-4be5-90d0-0fc9698cf66c';
        //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscribe/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c
        var cookies = headers['set-cookie'][0];
        var jsessionCookie = cookies.substring(0, cookies.indexOf(';Path'));
        var options = {
            host: config.host,
            port: config.port,
            path: '/server/session/' + sessionId + '/api/subscribe/' + sessionId,
            //path: '/server/session/' + sessionId + '/api/subscription/' + sessionId + '/handleEvent',
            method: 'POST',
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json',
                'Cookie': jsessionCookie,
                'Connection': 'keep-alive'
            }
//            headers: {'Content-Type': 'application/json', 'Cookie': headers['set-cookie'][0], 'Connection': 'keep-alive'}
        };

        console.log('getModel options: ', options);
        //console.log('subscribe options: ', options, '\nhttp://' + options.host + ':' + options.port + options.path);

        var callback = function(response) {
            console.log('getModel response', response.headers);
            var data = '';
            response.on('data', function(chunk) {
                console.log('getModel data', chunk);
                data += chunk;
            });
            response.on('end', function() {
                console.log('getModel end: ', data, typeof data);
                // TODO stub
                var stub = '{"elements":[{"key":"P960","name":"AanvragenKinderbijslag","properties":{},"children":["P960-C0","P960-C1","P960-C2","P960-C3"],"displayName":"Aanvragen kinderbijslag","contentStyle":"page","messages":[],"type":"page","styles":[]},{"key":"P960-C2-C0_T","name":null,"properties":{},"children":[],"displayName":null,"contentStyle":"table","type":"container","styles":[]},{"key":"P960-C1-F0","name":"Verzekerde.Voornaam","properties":{},"questionText":"Voornaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-C0-C0","name":"GeenKinderen","properties":{},"children":["P960-C2-C0-C0-TI0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1","name":"Verzekerde","properties":{},"children":["P960-C1-F0","P960-C1-F1","P960-C1-F2","P960-C1-F3","P960-C1-F4","P960-C1-F5","P960-C1-F6","P960-C1-F7"],"displayName":"Gegevens verzekerde","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C2","name":"Aanvraag","properties":{},"children":["P960-C2-C0","P960-C2-B1"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C3","name":null,"properties":{},"children":["P960-C3-B0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C0-TI0","name":"BerekenHoogteKinderbijslag","properties":{},"nodes":[{"text":"Met de kinderbijslag betaalt de overheid mee aan de kosten die horen bij de opvoeding van een kind. Woont of werkt u in Nederland en heeft u kinderen jonger dan 18 jaar, dan krijgt u waarschijnlijk kinderbijslag. Hoeveel kinderbijslag u krijgt is o.a. afhankelijk van de leeftijd van uw kind. Wilt u weten hoeveel kinderbijslag u krijgt? Maak dan een proefberekening.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C2-C0-C0-TI0","name":"GeenKinderen","properties":{},"nodes":[{"text":"Er zijn (nog) geen kinderen aanwezig.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C1-F3","name":"Verzekerde.Adres","properties":{},"questionText":"Adres","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F4","name":"Verzekerde.Postcode","properties":{},"questionText":"Postcode","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F1","name":"Verzekerde.Achternaam","properties":{},"questionText":"Achternaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F2","name":"Verzekerde.Geslacht","properties":{},"questionText":"Wat is uw geslacht?","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Man","value":"Man"},{"displayValue":"Vrouw","value":"Vrouw"}],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F7","name":"Verzekerde.BankGiroRekeningNummer","properties":{},"questionText":"Bank/giro rekeningnummer","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-B1","name":"Nieuw","properties":{},"disabled":false,"refresh":false,"caption":"Kind toevoegen","type":"button","styles":[]},{"key":"P960-C2-C0","name":"Kinderen","properties":{},"children":["P960-C2-C0_T","P960-C2-C0-C0"],"displayName":"Kinderen","contentStyle":"instance_selector","type":"container","styles":[]},{"key":"P960-C3-B0","name":"Bereken","properties":{},"disabled":false,"refresh":false,"caption":"Bereken kinderbijslag","type":"button","styles":[]},{"key":"P960-C1-F5","name":"Verzekerde.Woonplaats","properties":{},"questionText":"Woonplaats","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C0","name":"Infobanner","properties":{},"children":["P960-C0-TI0"],"displayName":"Proefberekening kinderbijslag","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1-F6","name":"Verzekerde.Land","properties":{},"questionText":"Land","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Nederland","value":"Nederland"},{"displayValue":"België","value":"Belgie"},{"displayValue":"Duitsland","value":"Duitsland"},{"displayValue":"Frankrijk","value":"Frankrijk"},{"displayValue":"Spanje","value":"Spanje"},{"displayValue":"Portugal","value":"Portugal"},{"displayValue":"Turkije","value":"Turkije"},{"displayValue":"Zwitserland","value":"Zwitserland"},{"displayValue":"Overig","value":"Overig"}],"messages":[],"values":[],"type":"field","styles":[]}],"language":{"patterns":{"datetime":"dd-mm-yyyy hh:mm:ss","date":"dd-mm-yyyy"},"languageCode":"nl-NL"}}';
                try {
                    var parsed = JSON.parse(stub);
                    //console.log('parsed: ', parsed);
                    self.state = new State(parsed);
                    //console.log('state', self.state, ' self ', self);
                    console.log('stub loaded');
                    //this.state = state;
                    //this.rl.prompt();
                } catch(e) {
                    console.error('could not parse', e);
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

    // TODO rename createSubscription conform core.js blueriq.Application.createSubscription?
    /* in core.js this is a POST to ../../server/session/<subscriptionId>/api/subscribe/
    POST, contentType application/json

     POST /server/session/3cb9ee47-6cf9-48a6-aaf4-2f1ac1b4b5cd/api/subscribe/ HTTP/1.1
     Host: lap-2077:8041
     User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0
     Accept: application/json; charset=UTF-8
     Accept-Language: en-US,en;q=0.5
     Accept-Encoding: gzip, deflate
     Content-Type: application/json
     X-Requested-With: XMLHttpRequest
     Referer: http://lap-2077:8041/web-resources/18b48b04-7b823322/portal2.html
     Cookie: AquimaWidgetSettings=e949dc64-9513-4964-a8ba-bc93d4736a3c; JSESSIONID=fqn0rdx9pc3c12mrc95fy9r74
     Connection: keep-alive
     Pragma: no-cache
     Cache-Control: no-cache
     Content-Length: 0



     *  */
    Bsession.prototype.subscribe = function(sessionId) {
        var self = this;
        //http://localhost:8080/war/server/session/subscriptionId/api/subscribe
        var options = {
            host: config.host,
            port: config.port,
            path: '/server/session/' + sessionId + '/api/subscribe/',
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Connection': 'keep-alive'}
        };

        console.log('subscribe options: ', options, '\nhttp://' + options.host + ':' + options.port + options.path);

        var callback = function(response) {
            var data = '';
            console.log('subscribe response headers: ', response.headers);
            response.on('data', function(chunk) {
                console.log('data: ', chunk);
                data += chunk;
            });
            response.on('end', function() {
                console.log('end: ', data, typeof data);
                setTimeout(function() {
                    self.getModel(response.headers, sessionId)
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

    // TODO rename ?
    Bsession.prototype.start = function(headers) {
        //console.log('start: ');
        var self = this;

        var cookies = headers['set-cookie'][0];
        var jsessionCookie = cookies.substring(0, cookies.indexOf(';Path'));

        var options = {
            host: config.host,
            port: config.port,
            path: '/server/start?project=' + config.project +
            '&flow=' + config.flow +
            '&version=' + config.version + '&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true',
            method: 'GET',
            //headers: {'Content-Type': 'application/json', 'Connection': 'keep-alive'}
            headers: {
                //'Accept': 'application/json; charset=UTF-8',
                //'Content-Type': 'application/json',
                'Cookie': jsessionCookie,
                'Connection': 'keep-alive'
            }
        };

        console.log('init options: ', options);

        var callback = function(response) {
            console.log('start response headers: ', response.headers);
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
                            self.subscribe(parsed.sessionId)
                        }, 100);
                    } catch(e) {
                        console.error('could not parse');
                    }
                }
            });
        };

        http.request(options, callback).end();

        //Browser.localhost(config.host, config.port);
        //var browser = new Browser();
        //browser.visit('/server/start?project=' + config.project +
        //'&flow=' + config.flow +
        //'&version=' + config.version + '&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true');
        //console.log(browser.resources);
        //var r = browser.resources['0'].response();
        //console.log(r);
        //browser.request()
    };

    // Forcibly create a session cookie (JSESSIONID)
    Bsession.prototype.createHttpSession = function() {
        var self = this;
        //http://localhost:8080/war/server/session/subscriptionId/api/subscribe
        var options = {
            host: config.host,
            port: config.port,
            //path: '/server/start?project=' + config.project +
            //'&flow=' + config.flow +
            //'&version=' + config.version + '&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true',//'/server/start', //session/0/api/subscribe/',// + sessionId + '/api/subscribe/',
            path: '/server/session/0/api/subscribe/',// + sessionId + '/api/subscribe/',
            method: 'POST',
            //headers: {'Content-Type': 'application/json', 'Connection': 'keep-alive'}
            headers: {'Connection': 'keep-alive'}
        };

        console.log('createHttpSession options: ', options, '\nhttp://' + options.host + ':' + options.port + options.path);

        var callback = function(response) {
            console.log('createHttpSession response headers: ', response.headers);
            setTimeout(function() {
                self.start(response.headers);
            }, 100);
        };

        http.request(options, callback).end();
    };

    //Bsession.prototype.getState = function() {
    //    console.log('state1', this.state);
    //    return this.state;
    //};

    module.exports = Bsession;
})();