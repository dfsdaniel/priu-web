import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),

    benefit: DS.attr('number'),
    penalty: DS.attr('number'),
    cost: DS.attr('number'),
    risk: DS.attr('number'),

    comments: DS.hasMany('story-comment', {inverse: 'story'})
});