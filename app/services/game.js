import Service from '@ember/service';
import { UserActions, StoryCommentsConstants } from 'priu-web/utils/constants';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import ObjectProxy from '@ember/object/proxy'
import moment from 'moment';

export default Service.extend({
  isActive: true,

  allActions: null,

  currentUser: alias('diGlobal.currentUser'),
  allUsers: alias('diGlobal.allUsers'),

  getUserPoints(user) {
    const userActions = this.get('allActions').filter((userAction) => userAction.get('userReceived.id') == user.get('id'));
    return userActions.reduce((acc, userAction) => acc + userAction.get('points'), 0);
  },

  rankedUsers: computed('allActions.[]', function() {
    const rankedUsers = this.get('allUsers').map((user) => {
      return new ObjectProxy({
        content: user,
        points: this.getUserPoints(user),
        userRanking: 0
      });
    });

    return rankedUsers.sort((userA, userB) => {
      return userA.points < userB.points;
    }).map((user, index) => {
      user.set('userRanking', index + 1);
      return user;
    });
  }),

  topCommenters: computed('allActions.[]', function() {
    const userActions = this.get('allActions').filter((userAction) => userAction.get('action') == UserActions.ADD_COMMENT.value || userAction.get('action') == UserActions.FIRST_COMMENT.value);
    const userMap = {};
    userActions.forEach(action => {
      const count = userMap[action.get('userReceived.id')] ? userMap[action.get('userReceived.id')].qtd : 0;
      userMap[action.get('userReceived.id')] = new ObjectProxy ({
        content: action.get('userReceived'),
        qtd: count + 1,
        userRanking: 0
      });
    });

    return Object.values(userMap).sort((userA, userB) => {
      return userA.qtd < userB.qtd;
    }).map((user, index) => {
      user.set('userRanking', index + 1);
      return user;
    });
  }),

  createAction(type) {
    return this.get('diStore').createRecord('user-action', {
      userCreated: this.get('currentUser'),
      userReceived: this.get('currentUser'),
      action: type.value,
      points: type.points,
      dateTime: moment().format()
    });
  },

  regLogin() {
    const action = this.createAction(UserActions.LOGIN);
    action.save();

    const globalService = this.get('diGlobal');
    globalService.notificationSuccess('Login', `Você ganhou ${action.get('points')} pontos por entrar no sistema!`);
  },

  regFirstComment() {
    const action = this.createAction(UserActions.FIRST_COMMENT);
    action.save();

    const globalService = this.get('diGlobal');
    globalService.notificationSuccess('Parabéns', `Você ganhou ${action.get('points')} pontos por ser o primeiro a comentar nesta estória!`);
  },

  regStoryVote() {
    const action = this.createAction(UserActions.STORY_VOTE);
    action.save();

    const globalService = this.get('diGlobal');
    globalService.notificationSuccess('Parabéns!', `Você ganhou ${action.get('points')} pontos por sua opinião na estória!`);
  },

  regAddComment() {
    const action = this.createAction(UserActions.ADD_COMMENT);
    action.save();

    const globalService = this.get('diGlobal');
    globalService.notificationSuccess('Comentário!', `Você ganhou ${action.get('points')} pontos comentar na estória!`);
  },

  regViewAC() {
    const action = this.createAction(UserActions.VIEW_AC);
    action.save();
  },

  regViewWireframes() {
    const action = this.createAction(UserActions.VIEW_WIREFRAMES);
    action.save();
  },

  deleteCommentOpinion(comment) {
    this.get('diStore').findAll('user-action').then((actions) => {
      const actionsForComment = actions.toArray().filter(action =>
        action.get('context') == comment.get('id') && action.get('userCreated.id') == this.get('currentUser.id'));


      let i = 0;

      const deleteAction = () => {
        if (i >= actionsForComment.length) { return; }

        let action = actionsForComment[i];
        action.destroyRecord().then(() => {
          i++;
          deleteAction();
        });
      };

      deleteAction();
    });
  },

  regCommentOpinion(comment, opinion) {
    let actionReceived = null;

    if (opinion.get('type') == StoryCommentsConstants.OPINION_TYPES.LIKE) {
      actionReceived = this.createAction(UserActions.RECEIVE_COMMENT_LIKE);
    } else {
      actionReceived = this.createAction(UserActions.RECEIVE_COMMENT_DISLIKE);
    }

    this.get('diStore').findAll('user-action').then((actions) => {
      const actionsForComment = actions.toArray().filter(action =>
        action.get('context') == comment.get('id')
        && action.get('userCreated.id') == this.get('currentUser.id')
        && action.get('userReceived.id') != this.get('currentUser.id'));

      const alreadyAction = actionsForComment.get('firstObject');
      if (alreadyAction) {

        alreadyAction.setProperties({
          action: actionReceived.get('action'),
          points: actionReceived.get('points'),
          dateTime: moment().format()
        });
        alreadyAction.save();

      } else {

        actionReceived.setProperties({
          userReceived: comment.get('user'),
          context: comment.get('id')
        });
        actionReceived.save();

        const action = this.createAction(UserActions.ADD_COMMENT_OPINION);
        action.set('context', comment.get('id'));
        action.save();

        const globalService = this.get('diGlobal');
        globalService.notificationSuccess('Obrigado!', `Você ganhou ${action.get('points')} pontos por avaliar este comentário!`);
      }
    });
  }
});
