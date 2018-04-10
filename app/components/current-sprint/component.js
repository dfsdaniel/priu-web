import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: 'alert alert-info mt-1',
  currentSprint: null,

  daysLeft: computed('currentSprint', function() {
    const sprint = this.get('currentSprint');
    return moment(sprint.get('startDate')).diff(moment(), 'days') + 1;
  })
});
