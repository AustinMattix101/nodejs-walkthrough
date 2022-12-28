// (function(exports, require, module, __filename, __dirname) {
// })
    // console.log(__filename);
    // console.log(__dirname);

const EventEmiiter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmiiter {
    log (message) {
    console.log(message);
    const ramdomsteamtoken = {};
    // console.log('This:', this);
    // Raise an event
    this.emit('messageLogged', { id: 1, url: 'http://'});
    }
}

module.exports = Logger;

