import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({  
	actions: {
		saveComment(comment) {
			const story = this.get('model');
			story.get('comments').pushObject(this.store.createRecord('story-comment', {
				story: story,
				content: comment,
				dateTime: moment()
			}));
		}
	}
});
