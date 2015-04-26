/**
 * Created by m.van.es on 9-3-2015.
 */

(function() {
    'use strict';

    //var commands = {
    //    help: function() {
    //        console.log('wut?');
    //    }
    //};

    var help = function() {
        console.log('help for Blueriq CLI');
        console.log('start - initialize session');
        console.log('ls (or look) - show all questions');
        console.log('answer n - answer question n');
        console.log('answer all - answer all questions, starting with the first and automatically continuing until all are answered.');
        console.log('exit - stop the program');
    };

    module.exports = {
        help: help
    };
})();