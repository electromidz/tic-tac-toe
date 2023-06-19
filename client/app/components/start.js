import Component from '@glimmer/component';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StartComponent extends Component {
  // @service('websocket') websocket;
  @service('socket-io') socketIOService;
  user = '';

  @action
  sendMessage() {
    const user = {
      type: 'user',
      username: this.user,
      id: Date.now(),
      isOnline: true,
    };
    console.log('USER ->', user);
    // this.websocket.sendMessage(JSON.stringify(user));
    this.socketIOService.onConnect;
  }

  @action
  handleInput(event) {
    this.user = event.target.value;
  }
}
