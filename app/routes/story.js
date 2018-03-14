import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel: function() {
    if (!this.get('userSession.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model(params) {
    return this.store.peekRecord('story', params.story_id);
	}
});
