/**
 * Created by m.van.es on 9-3-2015.
 */

(function() {
    'use strict';

    var chalk = require('chalk');

    // TODO State is the Model? Functions to manipulate State are Controllers/viewModels?
    /* Contains the Blueriq model and helper functions, e.g. an array of question objects */
    var State = function(modelJson, bsession) {
        this.model = modelJson;
        this.bsession = bsession;
        this.inputCommandline = this.prepareQuestions();
        this.texts = this.prepareTexts();
    };

    State.prototype.prepareQuestions = function() {
        var questions = this.model.elements.filter(function(element) {
            return element.type && element.type === 'field'; // if its type is 'field', it's a field
            //return element.questionText; // if it has a questionText, it is filtered as a question
        });
        if(questions.length === 1) {
            return questions[0]; // there should only be one question
        } else {
            throw new Error('Unexpected number of fields: ' + questions.length);
        }
    };

    State.prototype.prepareTexts = function() {
        var texts = this.model.elements.filter(function(element) {
            return element.type && element.type === 'asset'; // if its type is 'asset', it's a text
        });
        return texts;
    };

    //// TODO replace by using this.questions?
    //State.prototype.getQuestions = function() {
    //    return this.questions;
    //};
    //
    //State.prototype.isReady = function() {
    //    return this.model;
    //};

    //State.prototype.look = function() {
    //    if(this.isReady) {
    //        var questions = this.getQuestions();
    //        console.log('I have ' + questions.length + ' questions for you:');
    //        questions.forEach(function(question, index) {
    //            var i = index + 1; // indexing at 1
    //            var message = question.questionText;
    //            if(question.values[0]) {
    //                message += ' => ' + question.values[0];
    //            }
    //            console.log(i + ')', message);
    //        });
    //    } else {
    //        throw new Error('State not initialized');
    //    }
    //};
    //
    //// TODO ugly to have rl as a param
    //State.prototype.answer = function(answerIndex, rl) {
    //    if(this.isReady()) {
    //        //console.log(state.getQuestions()[answerIndex].questionText);
    //        var question = this.getQuestions()[answerIndex - 1]; // Indexing at 1
    //        rl.question(question.questionText + '? ', function(answer) {
    //            console.log('> You answered ' + answer);
    //            question.values[0] = answer;
    //            rl.prompt();
    //        });
    //    } else {
    //        throw new Error('State not initialized');
    //    }
    //};

    State.prototype.printTextItems = function() {
        //this.texts.forEach(() => this.text); // fat arrow not yet supported by Node
        this.texts.forEach(function(currentValue) {
            //console.log('hallo');
            console.log('|', currentValue.text);
        });
    };

    State.prototype.askQuestion = function() {
        console.log(chalk.italic.green(this.inputCommandline.questionText));
    };

    State.prototype.answerQuestion = function(answer) {
        console.log('answering the question with "%s"', answer);
        this.inputCommandline.value = answer;
        this.submitAnswer();
    };

    State.prototype.submitAnswer = function() {
        // submit such a json:
        // {"elementKey":"P866-C0-F2","fields":[{"key":"P866-C0-F2","values":["bekijk pas"]}]}
        // to
        // http://lap-2077:8041/server/session/6d532668-cf48-4890-8165-19ad0338d06a/api/subscription/6d532668-cf48-4890-8165-19ad0338d06a/handleEvent
        // for sure take care to reuse the cookie jar to prevent a session timeout

        // var requestJson = `{"elementKey":"${this.inputCommandline.key}","fields":[{"key":"P866-C0-F2","values":["bekijk pas"]}]}`; Unknown if ES6 string templates work in Node.
        var requestJson = '{"elementKey":"' + this.inputCommandline.key +
            '","fields":[{"key":"' + this.inputCommandline.key +
            '","values":["' + this.inputCommandline.value + '"]}]}';
        this.bsession.submitAnswer(requestJson);
    };

    module.exports = State;
})();
