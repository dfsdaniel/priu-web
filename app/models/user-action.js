import DS from 'ember-data';

const UserAction = DS.Model.extend({
    user: DS.belongsTo('user'),

    action: DS.attr('string'),
    points: DS.attr('string'),
    dateTime: DS.attr('string')
});

export default UserAction;
