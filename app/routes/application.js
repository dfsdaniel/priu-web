import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { all } from 'rsvp';

export default Route.extend({
  beforeModel: function() {
    return this.get('userSession').fetch()
    .then(() => {
      this.set('diGlobal.currentUserId', this.get('userSession.currentUser.uid'));
    })
    .catch(() => {
      this.transitionTo('login');
    });
  },

  model() {
    const currentUserId = this.get('diGlobal.currentUserId');
    if (!currentUserId) {
      return null;
    }

    return hash({
      user: this.store.find('user', currentUserId),
      allStories: this.store.findAll('story'),
      allSprints: this.store.findAll('sprint')
    }).then(result => {
      const allVotes = [];

      const currentStrintList = result.allSprints.filter(sp => sp.get('isCurrent'));
      let currentSprint = null;
      if (currentStrintList.length) {
        currentSprint = currentStrintList.get('firstObject');
      } else {
        currentSprint = result.allSprints.get('firstObject');
      }
      const sprintStories = result.allStories.filter(st => st.get('sprint.id') == currentSprint.get('id'));

      sprintStories.forEach(story => {
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
            allStories: sprintStories,
            currentSprint: currentSprint
          };
        });
      });
    });
  },

  afterModel(model) {
    if (model) {
      this.set('diGlobal.currentUser', model.user);
      this.set('diGlobal.allStories', model.allStories);
      this.set('diGlobal.currentSprint', model.currentSprint);
    }
  },

  actions: {
    refreshAppRoute() {
      this.refresh();
    },

    signIn(email, password, onSuccess, onError) {
      this.get('userSession').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(data => {
        this.set('diGlobal.currentUserId', data.currentUser.uid);
        onSuccess();
        this.send('refreshAppRoute');
      }).catch(error => {
        onError(error);
      });
    },

    signOut() {
      this.get('userSession').close().then(() => {
        this.set('diGlobal.currentUserId', null);
        this.send('refreshAppRoute');
      });
    }
  }
});