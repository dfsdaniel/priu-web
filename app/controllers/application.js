import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({

  currentUser: alias('model.user'),
  allStories: alias('model.allStories'),
  currentSprint: alias('model.currentSprint'),
  allActions: alias('model.allActions'),

  rankedUsers: alias('diGame.rankedUsers'),

  alertClass: alias('diGlobal.notification.alertClass'),
  alertTitle: alias('diGlobal.notification.title'),
  alertText: alias('diGlobal.notification.text'),

  currentUserRanking: computed('rankedUsers', function() {
    const currentUser = this.get('currentUser');
    return this.get('rankedUsers').findIndex((user) => user.get('id') == currentUser.id) + 1;
  }),

  currentUserPoints: computed('currentUser', 'allActions.[]', function() {
    const currentUser = this.get('currentUser');
    const userActions = this.get('allActions').filter((userAction) => userAction.get('userReceived.id') == currentUser.get('id'));

    return userActions.reduce((acc, userAction) => acc + userAction.get('points'), 0);
  }),

  actions: {
    onSignOut() {
      this.send('signOut');
    }
  }
});
