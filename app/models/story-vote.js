import DS from 'ember-data';

const StoryVote = DS.Model.extend({
    user: DS.belongsTo('user'),
    story: DS.belongsTo('story'),

    benefit: DS.attr('number'),
    penalty: DS.attr('number'),
    cost: DS.attr('number'),
    risk: DS.attr('number'),
});

StoryVote.reopenClass({
  FIXTURES: [
    {
      id: 1,
      user: 1,
      story: 1,
   		benefit: 5,
	    penalty: 5,
	    cost: 9,
	    risk: 7,
    },
    {
      id: 2,
      user: 1,
      story: 2,
   		benefit: 5,
	    penalty: 5,
	    cost: 4,
	    risk: 2,
    },
    {
      id: 3,
      user: 2,
      story: 1,
   		benefit: 9,
	    penalty: 9,
	    cost: 5,
	    risk: 5,
    },
    {
      id: 4,
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
