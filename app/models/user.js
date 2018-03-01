import DS from 'ember-data';

const User = DS.Model.extend({
    name: DS.attr('string'),
    ranking: DS.attr('number')
});

User.reopenClass({
    FIXTURES: [
        {
            id: 1,
            name: 'Daniel Ferreira',
            ranking: 7
        }
    ]
});

 export default User;