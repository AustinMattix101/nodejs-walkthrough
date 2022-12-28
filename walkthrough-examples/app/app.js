const EventEmiiter = require('events');

const Logger = require('./logger');
const logger = new Logger();

// emitter.addListener();
logger.on('messageLogged', (arg) => { //e , eventArg
    console.log('Listener called', arg);
});

logger.log('Logged!');

// Raise: logging (data:message...)

// const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

// const filesasync = fs.readdir('./', function(err, filesasync){
//     if (err) console.log('Invalid Path Error', err); 
//     else console.log('Dir :', filesasync);
// })


// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// console.log('TotalMemory', totalMemory);
// console.log('FreeMemory', freeMemory);

// console.log(`TotalMemory ${totalMemory}`);
// console.log(`FreeMemory ${freeMemory}`);

// const path = require('path');
// var parObj = path.parse(__filename);

// console.log(parObj);

// const log = require('./logger');

// log('message');
// console.log(module);
// // const Function = newFunction('Austin Mattix');

// // function newFunction(args) {
// //     console.log(args);
// // }

// // // setTimeout()
// // // clearTimeout();

// // // setInterval(() => {
    
// // // }, interval);

// // // clearInterval();
// // var message = '';
// // global.console.log(this.message);
