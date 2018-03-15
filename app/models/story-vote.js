import DS from 'ember-data';

const StoryVote = DS.Model.extend({
    user: DS.belongsTo('user'),

    benefit: DS.attr('number', {defaultValue: 5}),
    penalty: DS.attr('number', {defaultValue: 5}),
    cost: DS.attr('number', {defaultValue: 5}),
    risk: DS.attr('number', {defaultValue: 5}),

    dateTime: DS.attr('string')
});

export default StoryVote;
