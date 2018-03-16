import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  currentUser: alias('diGlobal.currentUser'),
  allStories: alias('diGlobal.allStories'),

  actions: {
    onSignOut() {
      this.send('signOut');
    }
  }
});
