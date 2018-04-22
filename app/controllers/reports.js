import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { UserRoles } from 'priu-web/utils/constants';
import ObjectProxy from '@ember/object/proxy'

export default Controller.extend({
  allStories: alias('diGlobal.allStories'),
  allActions: alias('diGame.allActions'),
  currentSprint: alias('diGlobal.currentSprint'),

  storiesWithVotes: computed('allStories', function() {
    const allStories = this.get('allStories');

    return allStories.map((story) => {
      const allVotes = story.get('votes');
      const votesByPO = allVotes.filter((vote) => vote.get('user.role') == UserRoles.PO);
      const votesByDEV = allVotes.filter((vote) => vote.get('user.role') == UserRoles.DEV);

      return new ObjectProxy({
        content: story,
        votesByDEV,
        votesByPO
      });
    });
  }),
});
