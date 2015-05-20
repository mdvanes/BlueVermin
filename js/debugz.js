/**
 * Created by m.van.es on 20-5-2015.
 */

(function() {
    'use strict';

    var enabled = false;

    module.exports = {
        //log: function (...statement) { // rest parameters doesn't work yet
        log: function(callback) {
            if(enabled) {
                //console.log(chalk.blue.italic(statement));
                callback();
            }
        },
        enable: function() {
            enabled = true;
        },
        disable: function() {
            enabled = false;
        }
    };

})();
