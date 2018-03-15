import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { all } from 'rsvp';

export default Route.extend({
	beforeModel: function() {
    if (!this.get('userSession.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model(params) {
    return this.store.findRecord('story', params.story_id).then(story => {
      return resolve(story.get('comments')).then(comments => {
        const allOpinions = [];

        comments.forEach(comment => {
          allOpinions.push(comment.get('opinions'));
        });
        return all(allOpinions).then(() => story);
      });
    });
	}
});
