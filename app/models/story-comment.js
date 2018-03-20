import DS from 'ember-data';
import { computed } from '@ember/object';
import { StoryCommentsConstants } from 'priu-web/utils/constants';

const StoryComment = DS.Model.extend({
  user: DS.belongsTo('user'),

  dateTime: DS.attr('string'),
  content: DS.attr('string'),

  opinions: DS.hasMany('story-comment-opinion', {async: true, inverse: null}),

  likesCount: computed('opinions.@each.type', function() {
    const likes = this.get('opinions').filter(op => op.get('type') == StoryCommentsConstants.OPINION_TYPES.LIKE);
    return likes.get('length');
  }),

  dislikesCount: computed('opinions.@each.type', function() {
    const likes = this.get('opinions').filter(op => op.get('type') == StoryCommentsConstants.OPINION_TYPES.DISLIKE);
    return likes.get('length');
  }),

  currentUserOpinion: computed('opinions.[]', 'diGlobal.currentUser.id', function() {
    const currentUser = this.get('diGlobal.currentUser');
    const opinions = this.get('opinions').filter(comment => comment.get('user.id') == currentUser.get('id'));
    return opinions.length ? opinions.get('firstObject') : null;
  }),

  canSendOpinion: computed('currentUserOpinion', function() {
    const currentUser = this.get('diGlobal.currentUser');
    return this.get('user.id') != currentUser.get('id');
  })
});

export default StoryComment;
