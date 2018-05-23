import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';
import { StoryCommentsConstants } from 'priu-web/utils/constants';
import { isEmpty } from '@ember/utils';
import config from '../config/environment';

export default Controller.extend({
	isGamified: config.isGamified,

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

	btDetailsDisabled: computed.empty('model.details'),
	btAcceptanceDisabled: computed.empty('model.acceptance'),
	btWireframesDisabled: computed.empty('model.wireframes'),

	isSaving: false,

	addCommentOpinion(comment, type) {
		if (comment.get('canSendOpinion')) {
			const currentUserOpinion = comment.get('currentUserOpinion');

			if (currentUserOpinion) {
				if (currentUserOpinion.get('type') == type) {
					comment.get('opinions').removeObject(currentUserOpinion);
					return comment.save().then(() => {
						currentUserOpinion.deleteRecord();
						return currentUserOpinion.save().then(() => {
							this.get('diGame').deleteCommentOpinion(comment);
						});
					});
				} else {
					currentUserOpinion.set('type', type);
					return currentUserOpinion.save().then(() => {
						this.get('diGame').regCommentOpinion(comment, currentUserOpinion);
					});
				}
			} else {
				const commentOpinion = this.store.createRecord('story-comment-opinion', {
					user: this.get('currentUser'),
					type: type,
					dateTime: moment().format()
				});

				return commentOpinion.save().then(opinion => {
					comment.get('opinions').pushObject(opinion);
					return comment.save().then(() => {
						this.set('model', this.get('model'));

						this.get('diGame').regCommentOpinion(comment, opinion);
					});
				});
			}
		}
	},

	actions: {
		saveVote() {
			const story = this.get('model');
			const userVote = this.get('userVote');

			this.set('isSaving', true);

			if (userVote.get('isNew')) {
				userVote.setProperties({
					story,
					user: this.get('currentUser'),
					dateTime: moment().format()
				});

				userVote.save().then(userVote => {
					story.get('votes').pushObject(userVote);
					story.save().then(() => {
						this.set('isSaving', false);
						this.get('diGame').regStoryVote(story);
					});
				});
			} else {
				userVote.save().then(() => {
					this.set('isSaving', false);
				});
			}
		},

		saveComment(commentText) {
			const story = this.get('model');
			const currentUser = this.get('currentUser');
			const commentsByRole = story.get('comments').filter((comment) => comment.get('user.role') == currentUser.get('role'));
			const isFirstComment = isEmpty(commentsByRole);

			const newComment = this.store.createRecord('story-comment', {
				user: this.get('currentUser'),
				content: commentText,
				dateTime: moment().format()
			});
			newComment.save().then(newComment => {
				story.get('comments').pushObject(newComment);
				story.save();

				if (isFirstComment) {
					this.get('diGame').regFirstComment();
				} else {
					this.get('diGame').regAddComment();
				}
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
