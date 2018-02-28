import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user'),
    story: DS.belongsTo('story'),

    dateTime: DS.attr('datetime'),
    content: DS.attr('string')    
});