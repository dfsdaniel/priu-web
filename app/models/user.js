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

User.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Daniel Ferreira',
      role: UserConstants.ROLES.DEV,
      ranking: 7
    },
    {
      id: 2,
      name: 'Maria Lencastre',
      role: UserConstants.ROLES.PO,
      ranking: 2
    },
    {
      id: 3,
      name: 'João Pimentel',
      role: UserConstants.ROLES.DEV,
      ranking: 4
    },
  ]
});

 export default User;