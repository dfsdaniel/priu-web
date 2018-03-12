import DS from 'ember-data';
import { computed } from '@ember/object';

const Story = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  details: DS.attr('string'),
  acceptance: DS.attr('string'),
  wireframes: DS.attr('string'),

  votes: DS.hasMany('story-vote', {inverse: 'story'}),
  comments: DS.hasMany('story-comment', {async: true, inverse: null}),

  isVoted: computed('votes', function() {
    return this.get('votes').any(vote => vote.get('user.id') == this.get('diGlobal.currentUser.id'))
  })
});

Story.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Como administrador eu quero cadastrar filme no sistema',
      description: 'Descrição da story 01',
      details: 'mais detalhes da story 01',
      comments: [1, 2],
      votes: [1]
    },
    {
      id: 2,
      title: 'Como usuário eu quero listar todos os filmes',
      description: 'Descrição da story 02',
      details: 'mais detalhes da story 02',
      acceptance: 'crtérios da story 02',
      wireframes: 'esta story tem muitos wireframes!!',
      comments: [3],
      votes: [2]
    },
    {
      id: 3,
      title: 'Como usuário eu quero logar no sistema',
      description: 'Descrição da story 03',
      acceptance: 'crtérios da story 03',
    },
    {
      id: 4,
      title: 'Como usuário eu quero receber emails com novidades de filmes',
      description: 'Descrição da story 04',
      details: 'mais detalhes da story 04',
      acceptance: 'crtérios da story 04',
    },
    {
      id: 5,
      title: 'Como administrador eu quero excluir usuários do sistema',
      description: 'Descrição da story 05'
    },
    {
      id: 6,
      title: 'Como administrador eu quero efetuar uma venda ou troca de filme',
      description: 'Descrição da story 06',
      details: 'mais detalhes da story 06',
      acceptance: 'crtérios da story 06',
    },
    {
      id: 7,
      title: 'Como usuário eu quero alterar meu avatar e meu email',
      description: 'Descrição da story 07'
    }
  ]
});

export default Story;
