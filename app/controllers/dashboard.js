import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  allStories: alias('diGlobal.allStories'),
  currentSprint: alias('diGlobal.currentSprint'),

  actions: {
    selectSprint(sprint) {
      this.set('currentSprint.isCurrent', false);
      this.get('currentSprint').save();

      sprint.set('isCurrent', true);
      sprint.save();

      this.send('refreshAppRoute');
    }
  }
});
