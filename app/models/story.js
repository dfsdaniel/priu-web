import DS from 'ember-data';

const Story = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),

  votes: DS.hasMany('story-vote', {inverse: 'story'}),
  comments: DS.hasMany('story-comment', {inverse: 'story'})
});

Story.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Como usuário eu quero cadastrar filme no sistema',
      description: 'Descrição da story 01',      
      comments: [1, 2],
      votes: [1, 3]
    },
    {
      id: 2,
      title: 'Como usuário eu quero listar todos os filmes',
      description: 'Descrição da story 02',
      comments: [3],
      votes: [2, 4]
    }
  ]
});

export default Story;
