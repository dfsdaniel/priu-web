import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import _ from 'lodash';

export default Component.extend({
  classNames: 'story-comments',

  story: null,

  comments: computed('story.comments.@each.opinions', function() {
    return _.sortBy(this.get('story.comments').toArray(), comment => {
      return new moment(comment.get('dateTime'));
    }).reverse();
  }),

  commentsLastIndex: computed('comments', function() {
    return this.get('comments.length') - 1;
  }),

  didInsertElement() {
    const $textArea = this.$('textarea');
    $textArea.keyup((event) => {
      if (event.keyCode == 13) { //ENTER
        this.get('saveComment')($textArea.val());
        $textArea.val('');
      }
    });
  },

  actions: {
    likeComment(comment) {
      if (comment.get('canSendOpinion')) {
        this.get('addCommentLike')(comment);
      }
    },

    dislikeComment(comment) {
      if (comment.get('canSendOpinion')) {
        this.get('addCommentDislike')(comment);
      }
    }
  }
});
