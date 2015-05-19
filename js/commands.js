/**
 * Created by m.van.es on 9-3-2015.
 */
(function() {
    'use strict';

    var chalk = require('chalk');

    var printModel = function(state) {
        console.log(state.model);
    };

    // TODO ugly to have rl and state as params?
    var run = function(line, rl, state) {
        line = line.trim();
        if(line.indexOf('answer') === 0) {
            var param = line.split(' ');
            //console.log('answer ' + param[1]);
            if(param[1] === 'all') {
                console.warn(chalk.yellow('answer all is NYI'));
                rl.prompt();
            } else {
                state.answer(param[1], rl);
            }
        } else {
            switch(line) {
                //case 'look':
                //    state.look();
                //    break;
                //case 'next': // next page
                //    // TODO implement
                //    break;
                case 'debug':
                    // print page json
                    printModel(state); // TODO conditional
                    break;
                case 'help':
                    help();
                    break;
                case 'exit':
                    console.log(chalk.blue.bold('See you soon at BlueVermin!')); // TODO replace with game name?
                    process.exit(0);
                    break;
                default:
                    //console.error(chalk.red('Unknown command: `' + line.trim() + '`'));
                    state.answerQuestion(line.trim());
                    break;
            }
            rl.prompt();
        }
    };

    var help = function() {
        console.log('help for Blueriq CLI'); // TODO rename
        console.log('look - show all questions');
        console.log('answer n - answer question n');
        console.log('answer all - answer all questions, starting with the first and automatically continuing until all are answered.');
        console.log('exit - stop the program');
    };

    module.exports = {
        help: help,
        run: run
    };
})();