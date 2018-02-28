import Route from '@ember/routing/route';

export default Route.extend({
  
  model() {
    return {
      user: this.store.createRecord('user', {
        name: 'Daniel Ferreira', 
        ranking: 6
      })
    }    
  }
});