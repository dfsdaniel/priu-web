import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({

  currentUser: alias('diGlobal.currentUser'),
  allStories: alias('diGlobal.allStories'),
  currentSprint: alias('diGlobal.currentSprint'),

  alertClass: alias('diGlobal.notification.alertClass'),
  alertTitle: alias('diGlobal.notification.title'),
  alertText: alias('diGlobal.notification.text'),

  actions: {
    onSignOut() {
      this.send('signOut');
    }
  }
});
