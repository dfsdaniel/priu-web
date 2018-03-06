import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({

	currentUser: alias('diGlobal.currentUser'),

	allStories: alias('diGlobal.allStories'),

	userVote: computed('model.votes.length', function() {
		const userVote = this.get('model.votes').filter(vote => vote.get('user.id') == this.get('currentUser.id')).get('firstObject');
		return userVote ? userVote : this.store.createRecord('story-vote', {
			user: this.get('currentUser'),
			story: this.get('model')
		});
	}),

	benefit: computed.alias('userVote.benefit'),
	penalty: computed.alias('userVote.penalty'),
	cost: computed.alias('userVote.cost'),
	risk: computed.alias('userVote.risk'),

	actions: {
		saveVote() {
			const story = this.get('model');
			const userVote = this.get('userVote');

			userVote.save().then(vote => {
				story.get('votes').pushObject(vote);
			});
		},

		saveComment(comment) {
			const story = this.get('model');
			story.get('comments').pushObject(this.store.createRecord('story-comment', {
				user: this.get('currentUser'),
				story: story,
				content: comment,
				dateTime: moment()
			}));
		}
	}
});
