(function() {
    'use strict';

    //var config = require('../config'),
    //var http = require('follow-redirects').http;
    var State = require('./State'),
        request = require('request');

    // Blueriq Session initializer / Blueriq SessionController?
    var Bsession = function() {//state, rl) {
        //this.state = state;
        //this.rl = rl;
    };

    // TODO wow such callback, much hell
    // TODO should be in a module

    // TODO in blueriq core.js it does: init? -> blueriq.Application.createSubscription -> blueriq.SessionService#subscribe (or something)
    // and after that for each page: http://lap-2077:8041/server/session/09b389e5-d76a-46a8-8bfd-7cb22f283722/api/subscription/09b389e5-d76a-46a8-8bfd-7cb22f283722/handleEvent

    Bsession.prototype.createHttpSession = function() {
        // TODO remove follow-redirects and zombie from package.json and node_modules
        // TODO convert to promises or generators
        // TODO use variables for URL
        var self = this;
        var blueriqInitHeaders = {
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
        };
        request.get(
            {
                url: 'http://lap-2077:8041/server/start?project=export-Kinderbijslag&flow=Start&version=0.0-Trunk&languageCode=nl-NL&ui=mvc&theme=cli&noTools=true',
                jar: true,
                headers: blueriqInitHeaders
            }, function(err,httpResponse,body) {
                //console.log('init body', body);
                var initJson = JSON.parse(body);
                console.log('sessionId_' + initJson.sessionId, initJson);
                request.post(
                    {
                        url: 'http://lap-2077:8041/server/session/'+initJson.sessionId+'/api/subscribe/',
                        jar: true,
                        headers: blueriqInitHeaders
                    }, function(){//err, httpResponse1, body1){
                        //console.log('subscribe: ', body1);//, httpResponse);
                        //console.log('subscribe httpResponse:', httpResponse1.headers);

                        request.post(
                            {
                                url: 'http://lap-2077:8041/server/session/'+initJson.sessionId+'/api/subscribe/'+initJson.sessionId,
                                jar: true,
                                headers: blueriqInitHeaders
                            }, function(err, httpResponse2, body2) {
                                //console.log('get page foo:', body2); // TODO log this if debug toggle is on
                                //console.log('get page headers:', httpResponse2.headers);

                                try {
                                    // TODO stub
                                    //var stub = '{"elements":[{"key":"P960","name":"AanvragenKinderbijslag","properties":{},"children":["P960-C0","P960-C1","P960-C2","P960-C3"],"displayName":"Aanvragen kinderbijslag","contentStyle":"page","messages":[],"type":"page","styles":[]},{"key":"P960-C2-C0_T","name":null,"properties":{},"children":[],"displayName":null,"contentStyle":"table","type":"container","styles":[]},{"key":"P960-C1-F0","name":"Verzekerde.Voornaam","properties":{},"questionText":"Voornaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-C0-C0","name":"GeenKinderen","properties":{},"children":["P960-C2-C0-C0-TI0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1","name":"Verzekerde","properties":{},"children":["P960-C1-F0","P960-C1-F1","P960-C1-F2","P960-C1-F3","P960-C1-F4","P960-C1-F5","P960-C1-F6","P960-C1-F7"],"displayName":"Gegevens verzekerde","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C2","name":"Aanvraag","properties":{},"children":["P960-C2-C0","P960-C2-B1"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C3","name":null,"properties":{},"children":["P960-C3-B0"],"displayName":null,"contentStyle":"container","type":"container","styles":[]},{"key":"P960-C0-TI0","name":"BerekenHoogteKinderbijslag","properties":{},"nodes":[{"text":"Met de kinderbijslag betaalt de overheid mee aan de kosten die horen bij de opvoeding van een kind. Woont of werkt u in Nederland en heeft u kinderen jonger dan 18 jaar, dan krijgt u waarschijnlijk kinderbijslag. Hoeveel kinderbijslag u krijgt is o.a. afhankelijk van de leeftijd van uw kind. Wilt u weten hoeveel kinderbijslag u krijgt? Maak dan een proefberekening.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C2-C0-C0-TI0","name":"GeenKinderen","properties":{},"nodes":[{"text":"Er zijn (nog) geen kinderen aanwezig.","nodeType":"text"}],"type":"textitem","styles":[]},{"key":"P960-C1-F3","name":"Verzekerde.Adres","properties":{},"questionText":"Adres","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F4","name":"Verzekerde.Postcode","properties":{},"questionText":"Postcode","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F1","name":"Verzekerde.Achternaam","properties":{},"questionText":"Achternaam","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F2","name":"Verzekerde.Geslacht","properties":{},"questionText":"Wat is uw geslacht?","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Man","value":"Man"},{"displayValue":"Vrouw","value":"Vrouw"}],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C1-F7","name":"Verzekerde.BankGiroRekeningNummer","properties":{},"questionText":"Bank/giro rekeningnummer","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":true,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C2-B1","name":"Nieuw","properties":{},"disabled":false,"refresh":false,"caption":"Kind toevoegen","type":"button","styles":[]},{"key":"P960-C2-C0","name":"Kinderen","properties":{},"children":["P960-C2-C0_T","P960-C2-C0-C0"],"displayName":"Kinderen","contentStyle":"instance_selector","type":"container","styles":[]},{"key":"P960-C3-B0","name":"Bereken","properties":{},"disabled":false,"refresh":false,"caption":"Bereken kinderbijslag","type":"button","styles":[]},{"key":"P960-C1-F5","name":"Verzekerde.Woonplaats","properties":{},"questionText":"Woonplaats","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":false,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[],"messages":[],"values":[],"type":"field","styles":[]},{"key":"P960-C0","name":"Infobanner","properties":{},"children":["P960-C0-TI0"],"displayName":"Proefberekening kinderbijslag","contentStyle":"container","type":"container","styles":[]},{"key":"P960-C1-F6","name":"Verzekerde.Land","properties":{},"questionText":"Land","explainText":null,"dataType":"text","rejectedValue":null,"readonly":false,"required":true,"hasDomain":true,"multiValued":false,"refresh":false,"displayLength":-1,"domain":[{"displayValue":"Nederland","value":"Nederland"},{"displayValue":"België","value":"Belgie"},{"displayValue":"Duitsland","value":"Duitsland"},{"displayValue":"Frankrijk","value":"Frankrijk"},{"displayValue":"Spanje","value":"Spanje"},{"displayValue":"Portugal","value":"Portugal"},{"displayValue":"Turkije","value":"Turkije"},{"displayValue":"Zwitserland","value":"Zwitserland"},{"displayValue":"Overig","value":"Overig"}],"messages":[],"values":[],"type":"field","styles":[]}],"language":{"patterns":{"datetime":"dd-mm-yyyy hh:mm:ss","date":"dd-mm-yyyy"},"languageCode":"nl-NL"}}';
                                    //var pageObj = JSON.parse(stub);
                                    var pageObj = JSON.parse(body2);
                                    //console.log('parsed: ', parsed);
                                    self.state = new State(pageObj);
                                    //console.log('state', self.state, ' self ', self);
                                    //console.log('stub loaded');
                                    //this.state = state;
                                    //this.rl.prompt();
                                } catch(e) {
                                    console.error('could not parse', e);
                                }
                            });
                    });
            });
    };

    //Bsession.prototype.getState = function() {
    //    console.log('state1', this.state);
    //    return this.state;
    //};

    module.exports = Bsession;
})();