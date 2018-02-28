import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: 'story-criteria card mt-2',

    text: '',
    value: 1,

    slider: null,

    invertIcons: false,

    leftIcon: computed('invertIcons', function() {
      return this.get('invertIcons') ? 'user-like' : 'user-dislike';
    }),
    rightIcon: computed('invertIcons', function() {
      return this.get('invertIcons') ? 'user-dislike' : 'user-like';
    }),

    didInsertElement() {
      const slider = this.$("#slider").slider({
        ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticks_labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ticks_snap_bounds: 30
      });
      slider.on('change', (event) => {
        this.set('value', event.value.newValue);
      });
      this.set('slider', slider);
    }
});
