import DS from 'ember-data';

const Sprint = DS.Model.extend({
  goal: DS.attr('string'),
  startDate: DS.attr('string'),
  endDate: DS.attr('string'),
  isCurrent: DS.attr('boolean'),
});

export default Sprint;
