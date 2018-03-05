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
      user: 1,
      dateTime: '03/01/2018 15:00',
      content: 'Esta estória vai ser muito complicado pois precisa de acesso remoto',
    },
    {
      id: 2,
      user: 2,
      dateTime: '02/28/2018 13:00',
      content: 'Estória tem risco alto. O cliente estará ausente nos periodos de desenvolvimento.'
    },
    {
      id: 3,
      user: 1,
      dateTime: '02/28/2002 15:30',
      content: 'Comentário 03'
    }
  ]
});

export default StoryComment;
