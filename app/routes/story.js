import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { all } from 'rsvp';
import AuthMixin from 'priu-web/mixins/auth-route';

export default Route.extend(AuthMixin, {

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
