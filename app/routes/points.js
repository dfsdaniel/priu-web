import Route from '@ember/routing/route';
import AuthMixin from 'priu-web/mixins/auth-route';
import { alias } from '@ember/object/computed';
import _ from 'lodash';
import moment from 'moment';
import ObjectProxy from '@ember/object/proxy'
import { UserActions } from 'priu-web/utils/constants';

export default Route.extend(AuthMixin, {
  allActions: alias('diGame.allActions'),
  currentUser: alias('diGlobal.currentUser'),

  model() {
    const currentUser = this.get('currentUser');
    const userActions = this.get('allActions')
      .filter((userAction) => userAction.get('userReceived.id') == currentUser.get('id'))
      .map((userAction) => {
        return new ObjectProxy({
          content: userAction,
          actionFormatted: UserActions[userAction.get('action')].label,
          dateTimeFormatted: moment(userAction.get('dateTime')).calendar()
        });
      });

    return _.sortBy(userActions, action => {
      return new moment(action.get('dateTime'));
    }).reverse();
  }
});
