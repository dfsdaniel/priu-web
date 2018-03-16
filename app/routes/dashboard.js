import Route from '@ember/routing/route';
import AuthMixin from 'priu-web/mixins/auth-route';

export default Route.extend(AuthMixin, {
  model() {
    return {
      sprints: this.store.findAll('sprint'),
      users: this.store.findAll('user')
    }
	}
});
