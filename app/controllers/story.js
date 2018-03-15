import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';
import { StoryCommentsConstants } from 'priu-web/utils/constants';

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

	addCommentOpinion(comment, type) {
		const commentOpinion = this.store.createRecord('story-comment-opinion', {
      user: this.get('currentUser'),
      type: type,
      dateTime: moment().format()
    });

    commentOpinion.save().then(opinion => {
      comment.get('opinions').pushObject(opinion);
      comment.save().then(()=> {
      	this.set('model', this.get('model'));
      });
    });
	},

	actions: {
		saveVote() {
			const story = this.get('model');
			const userVote = this.get('userVote');

			userVote.setProperties({
				story,
				user: this.get('currentUser'),
				dateTime: moment().format()
			});

			userVote.save().then(userVote => {
				story.get('votes').pushObject(userVote);
				story.save();
			});
			this.send('refreshAppRoute');
		},

		saveComment(commentText) {
			const story = this.get('model');
			const newComment = this.store.createRecord('story-comment', {
				user: this.get('currentUser'),
				content: commentText,
				dateTime: moment().format()
			});
			newComment.save().then(newComment => {
				story.get('comments').pushObject(newComment);
				story.save();
			});
		},

		addCommentLike(comment) {
			this.addCommentOpinion(comment, StoryCommentsConstants.OPINION_TYPES.LIKE);
		},

		addCommentDislike(comment) {
			this.addCommentOpinion(comment, StoryCommentsConstants.OPINION_TYPES.DISLIKE);
		}
	}
});
