import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { A } from '@ember/array'
import moment from 'moment';

export default Controller.extend({

	currentUser: alias('diUser.currentUser'),

	allStories: computed(function() {
		const allStories = A();
		allStories.pushObject(this.store.find('story', 1));
		allStories.pushObject(this.store.find('story', 2));
		return allStories;
	}),

	userVote: computed('model', function() {
		return this.get('model.votes').filter(vote => vote.get('user.id') == this.get('currentUser.id')).get('firstObject');
	}),

	benefit: computed.alias('userVote.benefit'),
	penalty: computed.alias('userVote.penalty'),
	cost: computed.alias('userVote.cost'),
	risk: computed.alias('userVote.risk'),

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
