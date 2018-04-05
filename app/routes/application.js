import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { all } from 'rsvp';
import moment from 'moment';

export default Route.extend({
  beforeModel: function() {
    moment.locale('pt-br');

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
      allUsers: this.store.findAll('user'),
      allStories: this.store.findAll('story'),
      allSprints: this.store.findAll('sprint'),
      allActions: this.store.findAll('user-action')
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
        let allUsers = [];
        votes.forEach(votesByStory => {
          allUsers = allUsers.concat(votesByStory.toArray().mapBy('user'));
        });
        return all(allUsers).then(() => {
          return {
            user: result.user,
            allUsers: result.allUsers,
            allStories: sprintStories,
            currentSprint: currentSprint,
            allActions: result.allActions
          };
        });
      });
    });
  },

  afterModel(model) {
    if (model) {
      this.setProperties({
        'diGlobal.currentUser': model.user,
        'diGlobal.allUsers': model.allUsers,
        'diGlobal.allStories': model.allStories,
        'diGlobal.currentSprint': model.currentSprint,
        'diGame.allActions': model.allActions
      });
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

        this.store.find('user', data.currentUser.uid).then((user) => {
          this.get('diGame').regLogin(user);
        });

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