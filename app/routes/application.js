import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      user: this.store.find('user', 1)
    };
  },

  afterModel(model) {
    this.set('diUser.currentUser', model.user);
  }
});