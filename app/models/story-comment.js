import DS from 'ember-data';

const StoryComment = DS.Model.extend({
    user: DS.belongsTo('user'),
    story: DS.belongsTo('story'),

    dateTime: DS.attr('date'),
    content: DS.attr('string')
});

StoryComment.reopenClass({
    FIXTURES: [
        {
            id: 1,
            dateTime: '02/28/2018 15:00',
            content: 'Comentário 01',
        },
        {
            id: 2,
            dateTime: '02/28/2018 13:00',
            content: 'Comentário 02'
        },
        {
            id: 3,
            dateTime: '02/28/2002 15:30',
            content: 'Comentário 03'
        }
    ]
});

export default StoryComment;
