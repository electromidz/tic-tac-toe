import Service from '@ember/service';

export default class SocketIOServiceService extends Service {
  /*
    1. Inject the socketio service
  */
  @service('socket-io') socketIOService;

  /*
    Important note: The namespace is an implementation detail of the Socket.IO protocol...
    http://socket.io/docs/rooms-and-namespaces/#custom-namespaces
  */
  namespace = 'cable';

  didInsertElement() {
    /*
      2. The next step you need to do is to create your actual socketIO.
    */
    const socket = this.socketIOService.socketFor(
      `http://localhost:3000/${this.namespace}`
    );

    /*
     * 3. Define any event handlers
     */
    socket.on('connect', this.onConnect, this);
    socket.on('message', this.onMessage, this);

    /*
      4. It is also possible to set event handlers on specific events
    */
    socket.on('myCustomEvent', () => {
      socket.emit('anotherCustomEvent', 'some data');
    });
  }

  onConnect() {
    const socket = this.socketIOService.socketFor(
      //   `http://localhost:3000/${this.namespace}`
      'ws://localhost:3000/cable'
    );

    /*
      There are 2 ways to send messages to the server: send and emit
    */
    socket.send('Hello World');
    socket.emit('Hello server');
  }

  onMessage(data) {
    // This is executed within the ember run loop
  }

  myCustomEvent(data) {
    const socket = this.socketIOService.socketFor(
      `http://localhost:3000/${this.namespace}`
    );
    socket.emit('anotherCustomEvent', 'some data');
  }

  willDestroyElement() {
    const socket = this.socketIOService.socketFor(
      `http://localhost:3000/${this.namespace}`
    );
    socket.off('connect', this.onConnect);
    socket.off('message', this.onMessage);
    socket.off('myCustomEvent', this.myCustomEvent);
  }
}
