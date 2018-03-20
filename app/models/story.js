import DS from 'ember-data';
import { computed } from '@ember/object';
import { UserConstants } from 'priu-web/utils/constants';

const Story = DS.Model.extend({
  sprint: DS.belongsTo('sprint'),

  title: DS.attr('string'),
  description: DS.attr('string'),
  acceptance: DS.attr('string'),
  wireframes: DS.attr('string'),

  votes: DS.hasMany('story-vote', {async: true, inverse: null}),
  comments: DS.hasMany('story-comment', {async: true, inverse: null}),

  isVoted: computed('votes.[]', 'diGlobal.currentUser.id', function() {
    return this.get('votes').any(vote => vote.get('user.id') == this.get('diGlobal.currentUser.id'))
  }),

  averageVotes: computed('votes.[]', function() {
    const allVotes = this.get('votes');
    const qtdVotes = allVotes.get('length');
    const storyVotes = {
      benefit: 0,
      penalty: 0,
      risk: 0,
      cost: 0
    };

    allVotes.forEach(vote => {
      const userRole = vote.get('user.role');

      storyVotes['benefit'] = storyVotes['benefit'] + (userRole == UserConstants.ROLES.PO) ? vote.get('benefit') : 0;
      storyVotes['penalty'] = storyVotes['penalty'] + (userRole == UserConstants.ROLES.PO) ? vote.get('penalty') : 0;
      storyVotes['risk'] = storyVotes['risk'] + (userRole == UserConstants.ROLES.DEV) ? vote.get('risk') : 0;
      storyVotes['cost'] = storyVotes['cost'] + (userRole == UserConstants.ROLES.DEV) ? vote.get('cost') : 0;
    });

    return {
      benefit: storyVotes['benefit'] / qtdVotes,
      penalty: storyVotes['penalty'] / qtdVotes,
      risk: storyVotes['risk'] / qtdVotes,
      cost: storyVotes['cost'] / qtdVotes
    };
  }),
});

export default Story;
