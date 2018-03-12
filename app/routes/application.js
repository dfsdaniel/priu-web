import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { all } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      user: this.store.find('user', 1),
      allStories: this.store.findAll('story')
    }).then(result => {
      const allVotes = [];
      result.allStories.forEach(story => {
        allVotes.push(story.get('votes'));
      });
      return all(allVotes).then(votes => {
        const allUsers = [];
        votes.forEach(votesByStory => {
          allUsers.push(votesByStory.mapBy('user'));
        });
        return all(allUsers).then(() => {
          return {
            user: result.user,
            allStories: result.allStories
          };
        });
      });
    });
  },

  afterModel(model) {
    this.set('diGlobal.currentUser', model.user);
    this.set('diGlobal.allStories', model.allStories);
  },

  actions: {
    refreshAppRoute() {
      this.refresh();
    }
  }
});