import Component from '@ember/component';

export default Component.extend({
	classNames: 'user-info',

	user: null,

  actions: {
    signOut() {
      this.get('onSignOut')();
    }
  }
});
