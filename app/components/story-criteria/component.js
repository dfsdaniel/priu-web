import Component from '@ember/component';
import { computed } from '@ember/object';
import { observer } from '@ember/object'

export default Component.extend({
    classNames: 'story-criteria card mt-2',

    text: '',
    value: 1,

    invertIcons: false,

    changeValue: observer('value', function() {
      // Quando o usuário trocar de estória precisa mudar o valor dinamicamente do slider.
      this.$('#slider').slider('setValue', this.get('value'));
    }),

    iconName: computed('value', function() {
      const invertIcons = this.get('invertIcons');

      if (invertIcons) {
        switch (this.get('value')) {
          case 1:
          case 2:
            return 'veryDissatisfied';
          case 3:
          case 4:
            return 'dissatisfied';
          case 5:
            return 'neutral';
          case 6:
          case 7:
            return 'satisfied';
          case 8:
          case 9:
            return 'verySatisfied';
          default:
            return 'neutral';
        }
      } else {
        switch (this.get('value')) {
          case 1:
          case 2:
            return 'verySatisfied';
          case 3:
          case 4:
            return 'satisfied';
          case 5:
            return 'neutral';
          case 6:
          case 7:
            return 'dissatisfied';
          case 8:
          case 9:
            return 'veryDissatisfied';
          default:
            return 'neutral';
        }
      }
    }),

    didInsertElement() {
      const slider = this.$('#slider').slider({
        ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticks_labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ticks_snap_bounds: 25,
        formatter: (value) => {
          return 'xablau ' + value;
        }
      });
      slider.on('change', (event) => {
        this.set('value', event.value.newValue);
      });
    }
});
