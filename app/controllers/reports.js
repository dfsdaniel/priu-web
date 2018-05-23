import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { UserRoles } from 'priu-web/utils/constants';
import ObjectProxy from '@ember/object/proxy';
import { UserActions } from 'priu-web/utils/constants';
import moment from 'moment';

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

  actions: computed('allActions', function() {
    return this.get('allActions').filter(action => action.get('userReceived.name') == 'Aryell Menezes')
      .map((userAction) => {
        return new ObjectProxy({
          content: userAction,
          actionFormatted: UserActions[userAction.get('action')].label,
          dateTimeFormatted: moment(userAction.get('dateTime')).calendar()
        });
      });
  })
});
