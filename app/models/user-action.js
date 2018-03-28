import DS from 'ember-data';

const UserAction = DS.Model.extend({
    userCreated: DS.belongsTo('user'),
    userReceived: DS.belongsTo('user'),

    action: DS.attr('string'),
    points: DS.attr('string'),
    dateTime: DS.attr('string'),

    context: DS.attr('string')
});

export default UserAction;
