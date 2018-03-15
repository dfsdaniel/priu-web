import DS from 'ember-data';

const StoryCommentOpinion = DS.Model.extend({
  user: DS.belongsTo('user'),

  dateTime: DS.attr('string'),
  type: DS.attr('string')
});

export default StoryCommentOpinion;