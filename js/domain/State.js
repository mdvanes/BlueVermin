/**
 * Created by m.van.es on 9-3-2015.
 */

(function() {
    'use strict';

    // TODO State is the Model? Functions to manipulate State are Controllers/viewModels?
    /* Contains the Blueriq model and helper functions, e.g. an array of question objects */
    var State = function(modelJson) {
        this.model = modelJson;
        this.questions = this.prepareQuestions();
    };

    State.prototype.prepareQuestions = function() {
        var questions = this.model.elements.filter(function(element) {
            return element.questionText; // if it has a questionText, it is filtered as a question
        });
        return questions;
    };

    // TODO replace by using this.questions?
    State.prototype.getQuestions = function() {
        return this.questions;
    };

    State.prototype.isReady = function() {
        return this.model;
    };

    State.prototype.look = function() {
        if(this.isReady) {
            var questions = this.getQuestions();
            console.log('I have ' + questions.length + ' questions for you:');
            questions.forEach(function(question, index) {
                var i = index + 1; // indexing at 1
                var message = question.questionText;
                if(question.values[0]) {
                    message += ' => ' + question.values[0];
                }
                console.log(i + ')', message);
            });
        } else {
            throw new Error('State not initialized');
        }
    };

    // TODO ugly to have rl as a param
    State.prototype.answer = function(answerIndex, rl) {
        if(this.isReady()) {
            //console.log(state.getQuestions()[answerIndex].questionText);
            var question = this.getQuestions()[answerIndex - 1]; // Indexing at 1
            rl.question(question.questionText + '? ', function(answer) {
                console.log('> You answered ' + answer);
                question.values[0] = answer;
                rl.prompt();
            });
        } else {
            throw new Error('State not initialized');
        }
    };

    module.exports = State;
})();
