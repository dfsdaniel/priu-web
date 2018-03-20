import Component from '@ember/component';

export default Component.extend({
  classNames: 'row story-comment',
  comment: null,

  opinionButtonEnabled: true,

  enableButtons() {
    this.set('opinionButtonEnabled', true);
  },

  actions: {
    likeComment(comment) {
      if (comment.get('canSendOpinion') && this.get('opinionButtonEnabled')) {
        this.set('opinionButtonEnabled', false);
        this.get('addCommentLike')(comment, this.enableButtons.bind(this));
      }
    },

    dislikeComment(comment) {
      if (comment.get('canSendOpinion') && this.get('opinionButtonEnabled')) {
        this.set('opinionButtonEnabled', false);
        this.get('addCommentDislike')(comment, this.enableButtons.bind(this));
      }
    }
  }
});
