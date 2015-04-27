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
        var questions = [];
        //console.log(this.model.elements.length);
        var elements = this.model.elements;
        // TODO a filter would be faster
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

    State.prototype.look = function() {
        if(this.isReady) {
            var questions = this.getQuestions();
            //console.log(questions.length);
            console.log('I have ' + questions.length + ' questions for you:');
            for(var i = 0; i < questions.length; i++) {
                var question = questions[i];
                console.log(i + ')', question.questionText);
            }
        } else {
            throw new Error('State not initialized');
        }
    };

    // TODO merge with look?
    State.prototype.review = function() {
        if(this.isReady) {
            var questions = this.getQuestions();
            //console.log(questions.length);
            console.log('I have ' + questions.length + ' questions for you:');
            for(var i = 0; i < questions.length; i++) {
                var question = questions[i];
                console.log(i + ')', question.questionText + ' => ' + question.values[0]);
            }
        } else {
            throw new Error('State not initialized');
        }
    };

    // TODO ugly to have rl as a param
    State.prototype.answer = function(answerIndex, rl) {
        if(this.isReady()) {
            //console.log(state.getQuestions()[answerIndex].questionText);
            var question = this.getQuestions()[answerIndex];
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
