import DS from 'ember-data';

const StoryVote = DS.Model.extend({
    user: DS.belongsTo('user'),

    benefit: DS.attr('number', {defaultValue: 5}),
    penalty: DS.attr('number', {defaultValue: 5}),
    cost: DS.attr('number', {defaultValue: 5}),
    risk: DS.attr('number', {defaultValue: 5}),

    dateTime: DS.attr('string')
});

StoryVote.reopenClass({
  FIXTURES: [
    {
      id: 1,
      user: 2,
      story: 1,
      benefit: 9,
      penalty: 9,
      cost: 5,
      risk: 5,
    },
    {
      id: 2,
      user: 2,
      story: 2,
      benefit: 7,
      penalty: 2,
      cost: 5,
      risk: 5,
    },
  ]
});

export default StoryVote;
