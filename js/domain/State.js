/**
 * Created by m.van.es on 9-3-2015.
 */

(function() {
    'use strict';

    // The state object should be in a separate file
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
            console.error('First run "start"!');
        }
    };

    //module.exports.State = State;
    module.exports = State;
})();

