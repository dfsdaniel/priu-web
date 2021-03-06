import DS from 'ember-data';
import { computed } from '@ember/object';
import { UserRoles } from 'priu-web/utils/constants';

const Story = DS.Model.extend({
  sprint: DS.belongsTo('sprint'),

  title: DS.attr('string'),
  details: DS.attr('string'),
  acceptance: DS.attr('string'),
  wireframes: DS.attr('string'),

  votes: DS.hasMany('story-vote', {async: true, inverse: null}),
  comments: DS.hasMany('story-comment', {async: true, inverse: null}),

  detailsHTML: computed('details', function() {
    return this.get('details').replace(/\n/g, '<br />').htmlSafe();
  }),

  acceptanceHTML: computed('acceptance', function() {
    return this.get('acceptance').replace(/\n/g, '<br />').htmlSafe();
  }),

  wireframesList: computed('wireframes', function() {
    return this.get('wireframes') ? this.get('wireframes').split(';') : '';
  }),

  isVoted: computed('votes.[]', 'diGlobal.currentUser.id', function() {
    return this.get('votes').any(vote => vote.get('user.id') == this.get('diGlobal.currentUser.id'))
  }),

  averageVotes: computed('votes.@each.{benefit,penalty,risk,cost}', function() {
    const allVotes = this.get('votes');

    let qtdVotesPO = allVotes.filter((vote) => vote.get('user.role') == UserRoles.PO).get('length');
    let qtdVotesDEV = allVotes.filter((vote) => vote.get('user.role') == UserRoles.DEV).get('length');

    const storyVotes = {
      benefit: 0,
      penalty: 0,
      risk: 0,
      cost: 0
    };

    allVotes.forEach(vote => {
      const userRole = vote.get('user.role');

      storyVotes['benefit'] = storyVotes['benefit'] + ((userRole == UserRoles.PO) ? vote.get('benefit') : 0);
      storyVotes['penalty'] = storyVotes['penalty'] + ((userRole == UserRoles.PO) ? vote.get('penalty') : 0);
      storyVotes['risk'] = storyVotes['risk'] + ((userRole == UserRoles.DEV) ? vote.get('risk') : 0);
      storyVotes['cost'] = storyVotes['cost'] + ((userRole == UserRoles.DEV) ? vote.get('cost') : 0);
    });

    // Ajuste para quando não houver nenhum voto ainda para a estória
    qtdVotesPO = qtdVotesPO == 0 ? 1 : qtdVotesPO;
    qtdVotesDEV = qtdVotesDEV == 0 ? 1 : qtdVotesDEV;

    return {
      benefit: storyVotes['benefit'] / qtdVotesPO,
      penalty: storyVotes['penalty'] / qtdVotesPO,
      risk: storyVotes['risk'] / qtdVotesDEV,
      cost: storyVotes['cost'] / qtdVotesDEV
    };
  }),
});

export default Story;
