import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import _ from 'lodash';

export default Component.extend({
  classNames: 'story-comments',

  story: null,

  comments: computed('story.comments.[]', function() {
    return _.sortBy(this.get('story.comments').toArray(), comment => {
      return new moment(comment.get('dateTime'));
    }).reverse();
  }),

  didInsertElement() {
    const $textArea = this.$('textarea');
    $textArea.keyup((event) => {
      if (event.keyCode == 13) { //ENTER
        this.get('saveComment')($textArea.val());
        $textArea.val('');
      }
    });
  }
});
