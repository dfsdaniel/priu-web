import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: 'priu-icon',
  name: '',

  neutral: computed.equal('name', 'neutral'),
  satisfied: computed.equal('name', 'satisfied'),
  dissatisfied: computed.equal('name', 'dissatisfied'),
  veryDissatisfied: computed.equal('name', 'veryDissatisfied'),
  verySatisfied: computed.equal('name', 'verySatisfied')
});
