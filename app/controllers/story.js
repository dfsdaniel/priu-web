import Controller from '@ember/controller';
import { alias } from '@ember/object/computed'
import moment from 'moment';

export default Controller.extend({

	currentUser: alias('diUser.currentUser'),

	actions: {
		saveComment(comment) {
			const story = this.get('model');
			story.get('comments').pushObject(this.store.createRecord('story-comment', {
				user: this.get('diUser.currentUser'),
				story: story,
				content: comment,
				dateTime: moment()
			}));
		}
	}
});
