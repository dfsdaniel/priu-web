import Mixin from '@ember/object/mixin';

export default Mixin.create({
  beforeModel: function() {
    if (!this.get('userSession.isAuthenticated')) {
      this.transitionTo('login');
    }
  },
});
