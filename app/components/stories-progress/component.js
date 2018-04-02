import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
    classNames: 'stories-progress mt-4',

    stories: null,

    value: computed('stories.@each.isVoted', function() {
        const stories = this.get('stories');
        const total = stories.get('length');
        const voted = stories.filter((story) => story.get('isVoted')).get('length');

        return (voted / total) * 100;
    }),

    percentualClass: computed('value', function() {
        const value = this.get('value');

        if (value < 30) {
            return 'low';
        } else if (value < 80) {
            return 'middle';
        } else if (value < 100) {
            return 'high';
        }

        return 'completed';
    })
});
