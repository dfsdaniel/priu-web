import Route from '@ember/routing/route';
import { resolve } from 'rsvp'

export default Route.extend({

  model(params) {
    return this.store.find('story', params.story_id).then(story => {
			return resolve(story.get('votes')).then(votes => {
				return resolve(votes).then(vote => {
					return resolve(vote.get('user')).then(() => {
						return story;
					})
				});
			})
		});
	}
});
