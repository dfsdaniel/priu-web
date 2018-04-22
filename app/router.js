import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard', {path: '/'});
  this.route('story', {path: '/story/:story_id'});
  this.route('points');
	this.route('login');

  this.route('createst');
  this.route('reports');
});

export default Router;
