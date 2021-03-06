(function() {
    'use strict';

    var request = require('request-promise'),
        debugz = require('../debugz'),
        config = require('../config');

    // TODO for debugging
    debugz.log(function() {
        require('request-debug')(request);
    });

    // TODO rename BSessionController? Blueriq Session initializer / Blueriq SessionController?
    var Bsession = function(isDebug) {
        this.isDebug = isDebug; // undefined is falsy, so omitting this param will set isDebug to false
    };

    // TODO remove request (not request-promise) from package.json?

    // In blueriq core.js it does: init? -> blueriq.Application.createSubscription -> blueriq.SessionService#subscribe (or something)
    // and after that for each page: http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/api/subscription/09b389e5-d76a-46a8-8bfd-7cb22f283722/handleEvent
    Bsession.prototype.getTestServerUrl = function(){
        return 'http://' + config.host + ':' + config.port;
    };
    Bsession.prototype.getInitUrl = function() {
        return 'http://' + config.host + ':' + config.port +
            '/server/start?project=' + config.project +
            '&flow=' + config.flow +
            '&version=' + config.version + '&languageCode=nl-NL&ui=mvc&' +
            'theme=' + config.theme + '&noTools=true';
    };
    Bsession.prototype.getCreateSubscriptionUrl = function() {
        return 'http://' + config.host + ':' + config.port +
            '/server/session/' + this.sessionId + '/api/subscribe/';
    };
    Bsession.prototype.getSubscribeUrl = function(){
        return this.getCreateSubscriptionUrl() + this.sessionId;
    };

    Bsession.prototype.createHttpSession = function() {
        var self = this;
        self.sessionId = null;
        //var blueriqInitHeaders = {
        //'accept': 'application/json; charset=UTF-8',
        //'accept-encoding': 'gzip, deflate',
        //'accept-language': 'en-US,en;q=0.5',
        //'cache-control': 'no-cache',
        //'connection': 'keep-alive',
        //'content-length': '0',
        //'content-type': 'application/json',
        //'host': 'lap-2077:8041',
        //'pragma': 'no-cache',
        //'referer': 'http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/mvc/index.html'
        //};

        return request({
            url: self.getTestServerUrl(),
            resolveWithFullResponse: true
        }).then(function(response) {
            if(response && response.statusCode === 404) {
                throw new Error('Server not found or not started');
            } else {
                // TODO request.get here
                return request.get({
                    url: self.getInitUrl(),
                    jar: true
                    //headers: blueriqInitHeaders
                });
            }
        }).catch(function(e) {
            throw new Error('Server not found or not started. ' + e);
        }).then(function(response) {
            if(response) {
                var initJson = JSON.parse(response);
                if(self.isDebug) {
                    console.log('DEBUG sessionId_' + initJson.sessionId, initJson);
                }
                self.sessionId = initJson.sessionId;
            } else {
                throw new Error('CreateHttpSession: no body returned');
            }
            return request.post({
                url: self.getCreateSubscriptionUrl(),
                jar: true
                //headers: blueriqInitHeaders
            });
        }).then(function(){
            return request.post({
                url: self.getSubscribeUrl(),
                jar: true
                //headers: blueriqInitHeaders
            });
        }).then(function(response){
            if(self.isDebug) {
                console.log('DEBUG get page content:', response);
            }
            try {
                // TODO stub and toggle with global isStubbed param?
                //var stub = '{"elements":[{"key":"P960","name":"AanvragenKinderbijslag","properties":{},"children":["P960-C0","P960-C1","P960-C2","P960-C3"],"displayName":"Aanvragen kinderbijslag","contentStyle":"page","messages":[],"type":"page","styles":[]},{"key":"P960-C2-C0_T","name":null,"properties":{},"children":[],"displayName":null,"contentStyle":"table","type":"container","styles":[]},{"key":"P960-C1-F0","name":"Verzekerde.Voornaam","properties":{},"questionText":"Voornaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-C0-C0","name":"GeenKinderen","properties":{},"children":["P960-C2-C0-C0-TI0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1","name":"Verzekerde","properties":{},"children":["P960-C1-F0","P960-C1-F1","P960-C1-F2","P960-C1-F3","P960-C1-F4","P960-C1-F5","P960-C1-F6","P960-C1-F7"],"displayName":"Gegevens verzekerde","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C2","name":"Aanvraag","properties":{},"children":["P960-C2-C0","P960-C2-B1"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C3","name":null,"properties":{},"children":["P960-C3-B0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C0-TI0","name":"BerekenHoogteKinderbijslag","properties":{},"nodes":[{"text":"Met de kinderbijslag betaalt de overheid mee aan de kosten die horen bij de opvoeding van een kind. Woont of werkt u in Nederland en heeft u kinderen jonger dan 18 jaar, dan krijgt u waarschijnlijk kinderbijslag. Hoeveel kinderbijslag u krijgt is o.a. afhankelijk van de leeftijd van uw kind. Wilt u weten hoeveel kinderbijslag u krijgt? Maak dan een proefberekening.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C2-C0-C0-TI0","name":"GeenKinderen","properties":{},"nodes":[{"text":"Er zijn (nog) geen kinderen aanwezig.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C1-F3","name":"Verzekerde.Adres","properties":{},"questionText":"Adres","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F4","name":"Verzekerde.Postcode","properties":{},"questionText":"Postcode","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F1","name":"Verzekerde.Achternaam","properties":{},"questionText":"Achternaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F2","name":"Verzekerde.Geslacht","properties":{},"questionText":"Wat is uw geslacht?","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Man","value":"Man"},{"displayValue":"Vrouw","value":"Vrouw"}],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F7","name":"Verzekerde.BankGiroRekeningNummer","properties":{},"questionText":"Bank/giro rekeningnummer","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-B1","name":"Nieuw","properties":{},"disabled":false,"refresh":false,"caption":"Kind toevoegen","type":"button","styles":[]},{"key":"P960-C2-C0","name":"Kinderen","properties":{},"children":["P960-C2-C0_T","P960-C2-C0-C0"],"displayName":"Kinderen","contentStyle":"instance_selector","type":"container","styles":[]},{"key":"P960-C3-B0","name":"Bereken","properties":{},"disabled":false,"refresh":false,"caption":"Bereken kinderbijslag","type":"button","styles":[]},{"key":"P960-C1-F5","name":"Verzekerde.Woonplaats","properties":{},"questionText":"Woonplaats","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C0","name":"Infobanner","properties":{},"children":["P960-C0-TI0"],"displayName":"Proefberekening kinderbijslag","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1-F6","name":"Verzekerde.Land","properties":{},"questionText":"Land","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Nederland","value":"Nederland"},{"displayValue":"België","value":"Belgie"},{"displayValue":"Duitsland","value":"Duitsland"},{"displayValue":"Frankrijk","value":"Frankrijk"},{"displayValue":"Spanje","value":"Spanje"},{"displayValue":"Portugal","value":"Portugal"},{"displayValue":"Turkije","value":"Turkije"},{"displayValue":"Zwitserland","value":"Zwitserland"},{"displayValue":"Overig","value":"Overig"}],"messages":[],"values":[],"type":"field","styles":[]}],"language":{"patterns":{"datetime":"dd-mm-yyyy hh:mm:ss","date":"dd-mm-yyyy"},"languageCode":"nl-NL"}}';
                //var pageObj = JSON.parse(stub);
                var pageObj = JSON.parse(response);
                return pageObj;
            } catch(e) {
                throw new Error('CreateHttpSession: could not parse page response: ' + e, e);
            }
        });
    };

    Bsession.prototype.submitAnswer = function(answer) {
        debugz.log(function() {console.log('Bsession.submitAnswer', answer, answer.fields[0].values);});


        // TODO construct url with function
        var url = 'http://' + config.host + ':' + config.port +
            '/server/session/' + this.sessionId + '/api/subscription/' + this.sessionId + '/handleEvent';

        // answer logs as:
        //    body: '"{\\"elementKey\\":\\"P866-C0-F2\\",\\"fields\\":[{\\"key\\":\\"P866-C0-F2\\",\\"values\\":[\\"bekijk deur\\"]}]}"' } }

        //var testAnswer = {
        //    elementKey: 'test'
        //};

        //answer = JSON.stringify(testAnswer);
        // logs as:
        //    body: '"{\\"elementKey\\":\\"test\\"}"' } }


        //answer = testAnswer;
        // logs as
        //      body: '{"elementKey":"test"}' } } <-- !!! Correct!!!

        // TODO Bad Request probably still because of the wrong escaping here.

        //var testAnswer = {
        //    elementKey: 'P866-C0-F2',
        //    fields: [
        //        {
        //            key: 'P866-C0-F2',
        //            values: [
        //                'bekijk deur'
        //            ]
        //        }
        //    ]
        //};
        //answer = testAnswer;

        return request.post({
            url: url,
            jar: true,
            //headers: blueriqInitHeaders
            json: true,
            headers: {
                'content-type': 'application/json; charset=UTF-8'//,
                //'content-length': answer.length
            },
            body: answer //JSON.stringify(answer)
        }).catch(function(e) {
            console.error('submitAnswer err. ' + e);
        });
    };

    module.exports = Bsession;
})();