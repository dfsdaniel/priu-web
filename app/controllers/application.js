import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSignOut() {
      this.send('signOut');
    }
  }
});
