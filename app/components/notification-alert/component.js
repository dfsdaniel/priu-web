import { observer } from '@ember/object';
import { later } from '@ember/runloop'
import Component from '@ember/component';

export default Component.extend({
  title: '',
  text: '',

  alertClass: 'hide',

  hide() {
    this.set('alertClass', 'hide');
  },

  setTimeout: observer('alertClass', function() {
    if (this.get('alertClass') == 'show') {
      later(() => this.hide(), 5000);
    }
  }),

  actions: {
    hideAlert() {
      this.hide();
    }
  }
});
