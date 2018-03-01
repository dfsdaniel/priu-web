import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
    classNames: 'story-comments',

    comments: computed.sort('story.comments.[]', function(cmA, cmB) {
        return moment(cmB.get('dateTime')).isAfter(cmA.get('dateTime'));
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
