import Component from '@glimmer/component';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class StartComponent extends Component {
  @service('websocket') websocket;
  @service router;

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
    this.websocket.sendMessage(JSON.stringify(user));
  }

  @action
  handleInput(event) {
    this.user = event.target.value;
  }
}
