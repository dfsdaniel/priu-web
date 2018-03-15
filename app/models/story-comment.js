import DS from 'ember-data';
import { computed } from '@ember/object';
import { StoryCommentsConstants } from 'priu-web/utils/constants';

const StoryComment = DS.Model.extend({
  user: DS.belongsTo('user'),

  dateTime: DS.attr('string'),
  content: DS.attr('string'),

  opinions: DS.hasMany('story-comment-opinion', {async: true, inverse: null}),

  likesCount: computed('opinions.[]', function() {
    const likes = this.get('opinions').filter(op => op.get('type') == StoryCommentsConstants.OPINION_TYPES.LIKE);
    return likes.get('length');
  }),

  dislikesCount: computed('opinions.length', function() {
    const likes = this.get('opinions').filter(op => op.get('type') == StoryCommentsConstants.OPINION_TYPES.DISLIKE);
    return likes.get('length');
  }),

  canSendOpinion: computed('opinions.[]', function() {
    const currentUser = this.get('diGlobal.currentUser');

    return this.get('user.id') != currentUser.get('id') &&
      this.get('opinions').every(comment => comment.get('user.id') != currentUser.get('id'));
  })
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
