import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  id: '1',
  title: '',
  acceptance: '',
  details: '',

  currentSprint: alias('diGlobal.currentSprint'),

  actions: {
    save() {
      const id = this.get('id');
      const title = this.get('title');
      const acceptance = this.get('acceptance');
      const details = this.get('details');
      const sprint = this.get('currentSprint');

      const story = this.store.createRecord('story', {id, title, acceptance, details, sprint});
      story.save();

      this.setProperties({
        title: '',
        acceptance: '',
        details: '',
        id: parseInt(id) + 1
      });
    }
  }
});
