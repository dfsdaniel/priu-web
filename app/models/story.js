import DS from 'ember-data';

const Story = DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),

    benefit: DS.attr('number'),
    penalty: DS.attr('number'),
    cost: DS.attr('number'),
    risk: DS.attr('number'),

    comments: DS.hasMany('story-comment', {inverse: 'story'})
});

Story.reopenClass({
    FIXTURES: [
        {
            id: 1,
            title: 'Como usuário eu quero cadastrar filme no sistema',
            description: 'Descrição da story 01',
            benefit: 3,
            penalty: 5,
            cost: 3,
            risk: 9,
            comments: [1, 2]
        },
        {
            id: 2,
            title: 'Como usuário eu quero listar todos os filmes',
            description: 'Descrição da story 02',
            benefit: 8,
            penalty: 2,
            cost: 8,
            risk: 8,
            comments: [3]
        }
    ]
});

export default Story;
