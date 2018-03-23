import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';
import { StoryCommentsConstants } from 'priu-web/utils/constants';

export default Controller.extend({

	currentUser: alias('diGlobal.currentUser'),
	currentSprint: alias('diGlobal.currentSprint'),

	userVote: computed('model', 'currentUser.id', function() {
		const userVote = this.get('model.votes').filter(vote => vote.get('user.id') == this.get('currentUser.id')).get('firstObject');
		return userVote ? userVote : this.store.createRecord('story-vote');
	}),

	benefit: computed.alias('userVote.benefit'),
	penalty: computed.alias('userVote.penalty'),
	cost: computed.alias('userVote.cost'),
	risk: computed.alias('userVote.risk'),

	btAcceptanceDisabled: computed.empty('model.acceptance'),
	btWireframesDisabled: computed.empty('model.wireframes'),

	addCommentOpinion(comment, type) {
		if (comment.get('canSendOpinion')) {
			const currentUserOpinion = comment.get('currentUserOpinion');

			if (currentUserOpinion) {
				if (currentUserOpinion.get('type') == type) {
					comment.get('opinions').removeObject(currentUserOpinion);
					return comment.save().then(() => {
						currentUserOpinion.deleteRecord();
						return currentUserOpinion.save();
					});
				} else {
					currentUserOpinion.set('type', type);
					return currentUserOpinion.save();
				}
			} else {
				const commentOpinion = this.store.createRecord('story-comment-opinion', {
					user: this.get('currentUser'),
					type: type,
					dateTime: moment().format()
				});

				return commentOpinion.save().then(opinion => {
					comment.get('opinions').pushObject(opinion);
					return comment.save().then(()=> {
						this.set('model', this.get('model'));
					});
				});
			}
		}
	},

	actions: {
		saveVote() {
			const story = this.get('model');
			const userVote = this.get('userVote');

			if (userVote.get('isNew')) {
				userVote.setProperties({
					story,
					user: this.get('currentUser'),
					dateTime: moment().format()
				});

				userVote.save().then(userVote => {
					story.get('votes').pushObject(userVote);
					story.save();

					this.get('diGame').regStoryVote();
				});
			} else {
				userVote.save();
			}
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

				this.get('diGame').regAddComment();
			});
		},

		addCommentLike(comment, callback) {
			this.addCommentOpinion(comment, StoryCommentsConstants.OPINION_TYPES.LIKE).then(callback);
		},

		addCommentDislike(comment, callback) {
			this.addCommentOpinion(comment, StoryCommentsConstants.OPINION_TYPES.DISLIKE).then(callback);
		}
	}
});
