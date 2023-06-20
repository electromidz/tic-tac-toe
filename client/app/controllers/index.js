import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StartController extends Controller {
  /*
   * 1. Inject the websockets service
   */
  @service('websockets') websockets;
  socketRef = null;

  constructor() {
    super(...arguments);

    /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    const socket = this.websockets.socketFor('ws://localhost:3000/cable');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', this.myCloseHandler, this);

    this.set('socketRef', socket);
  }

  myOpenHandler(event) {
    console.log(`On open event has been called: ${event}`);
  }

  myMessageHandler(event) {
    console.log(`Message: ${event.data}`);
  }

  myCloseHandler(event) {
    console.log(`On close event has been called: ${event}`);
  }
}
