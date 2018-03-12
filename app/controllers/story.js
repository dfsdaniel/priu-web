import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({

	currentUser: alias('diGlobal.currentUser'),

	allStories: alias('diGlobal.allStories'),

	userVote: computed('model', function() {
		const userVote = this.get('model.votes').filter(vote => vote.get('user.id') == this.get('currentUser.id')).get('firstObject');
		return userVote ? userVote : this.store.createRecord('story-vote');
	}),

	benefit: computed.alias('userVote.benefit'),
	penalty: computed.alias('userVote.penalty'),
	cost: computed.alias('userVote.cost'),
	risk: computed.alias('userVote.risk'),

	btDetailsDisabled: computed.empty('model.details'),
	btAcceptanceDisabled: computed.empty('model.acceptance'),
	btWireframesDisabled: computed.empty('model.wireframes'),

	actions: {
		saveVote() {
			const story = this.get('model');
			const userVote = this.get('userVote');

			userVote.setProperties({
				story,
				user: this.get('currentUser')
			});

			userVote.save().then(userVote => {
				story.get('votes').pushObject(userVote);
				story.save();
			});
			this.send('refreshAppRoute');
		},

		saveComment(comment) {
			const story = this.get('model');			
			const newComment = this.store.createRecord('story-comment', {
				user: this.get('currentUser'),
				content: comment,
				dateTime: moment().format()
			});
			newComment.save().then(newComment => {
				story.get('comments').pushObject(newComment);
				story.save();
			});
		}
	}
});
