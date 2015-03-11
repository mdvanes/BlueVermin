(function() {
    'use strict';

    var config = require('../config');
    var http = require('follow-redirects').http;
    var State = require('./State');
    //var request = require('request');

    // Blueriq Session initializer
    var Bsession = function() {//state, rl) {
        //this.state = state;
        //this.rl = rl;
    };

    // TODO wow such callback, much hell
    // TODO should be in a module
    Bsession.prototype.getModel = function(sessionId) {
        var self = this;
        //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscription/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/handleEvent
        //sessionId = 'bf29c26d-4fb2-4be5-90d0-0fc9698cf66c';
        //http://lap-2077:8041/server/session/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c/api/subscribe/bf29c26d-4fb2-4be5-90d0-0fc9698cf66c
        var options = {
            host: config.host,
            port: config.port,
            path: '/server/session/' + sessionId + '/api/subscribe/' + sessionId,
            //path: '/server/session/' + sessionId + '/api/subscription/' + sessionId + '/handleEvent',
            method: 'POST'
        };

        //console.log('getModel options: ', options);

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

    Bsession.prototype.subscribe = function(sessionId) {
        var self = this;
        //http://localhost:8080/war/server/session/subscriptionId/api/subscribe
        var options = {
            host: config.host,
            port: config.port,
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
                    self.getModel(sessionId)
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

    Bsession.prototype.start = function() {
        //console.log('start: ');
        var self = this;

        var options = {
            host: config.host,
            port: config.port,
            path: '/server/start?project=' + config.project +
            '&flow=' + config.flow +
            '&version=' + config.version + '&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true'
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
                            self.subscribe(parsed.sessionId)
                        }, 100);
                    } catch(e) {
                        console.error('could not parse');
                    }
                }
            });
        };

        http.request(options, callback).end();
    };

    //Bsession.prototype.getState = function() {
    //    console.log('state1', this.state);
    //    return this.state;
    //};

    module.exports = Bsession;
})();