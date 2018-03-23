import Service from '@ember/service';
import { UserActions } from 'priu-web/utils/constants';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default Service.extend({
  isActive: true,

  currentUser: alias('diGlobal.currentUser'),

  createAction(type) {
    return this.get('diStore').createRecord('user-action', {
      user: this.get('currentUser'),
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
});
