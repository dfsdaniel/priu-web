import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel: function() {
    if (this.get('userSession.isAuthenticated')) {
      this.transitionTo('story', 1);
    }
  }
});
