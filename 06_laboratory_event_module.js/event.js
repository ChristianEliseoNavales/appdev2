const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () => {
  console.log('Application Started!');
});

emitter.on('data', (data) => {
  console.log('Data received:', data);
});

emitter.on('error', (error) => {
  console.log('Error occurred:', error);
});

const data = { name: "John Doe", age: 25 };
const error = "Invalid Request!";

emitter.emit('start');
emitter.emit('data', `name: ${data.name} - age: ${data.age}`);
emitter.emit('error', error);

