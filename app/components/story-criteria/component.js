import Component from '@ember/component';
import { computed } from '@ember/object';
import { observer } from '@ember/object'

export default Component.extend({
    classNames: 'story-criteria card mt-2',

    text: '',
    value: 1,

    invertIcons: false,

    leftIcon: computed('invertIcons', function() {
      return this.get('invertIcons') ? 'user-dislike' : 'user-like';
    }),
    rightIcon: computed('invertIcons', function() {
      return this.get('invertIcons') ? 'user-like' : 'user-dislike';
    }),

    changeValue: observer('value', function() {
      // Quando o usuário trocar de estória precisa mudar o valor dinamicamente do slider.
      this.$('#slider').slider('setValue', this.get('value'));
    }),

    didInsertElement() {
      const slider = this.$('#slider').slider({
        ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticks_labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ticks_snap_bounds: 25
      });
      slider.on('change', (event) => {
        this.set('value', event.value.newValue);
      });
    }
});
