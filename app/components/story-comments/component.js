import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: 'story-comments',

    sortProperty: ['dateTime:desc'],

    comments: computed.sort('story.comments.[]', 'sortProperty'),

    didInsertElement() {
        const $textArea = this.$('textarea');
        $textArea.keyup((event) => {
            if (event.keyCode == 13) { //ENTER
                this.sendAction('saveComment', $textArea.val());
                $textArea.val('');
            }
        });
    }
});
