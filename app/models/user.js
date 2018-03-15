import DS from 'ember-data';
import { UserConstants } from 'priu-web/utils/constants';
import { computed } from '@ember/object';

const User = DS.Model.extend({
  name: DS.attr('string'),
  ranking: DS.attr('number'),
  role: DS.attr('string'),

  isDEV: computed.equal('role', UserConstants.ROLES.DEV),
  isPO: computed.equal('role', UserConstants.ROLES.PO),
});

export default User;
