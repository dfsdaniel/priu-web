import DS from 'ember-data';
import { UserRoles } from 'priu-web/utils/constants';
import { computed } from '@ember/object';

const User = DS.Model.extend({
  name: DS.attr('string'),
  ranking: DS.attr('number'),
  role: DS.attr('string'),

  isDEV: computed.equal('role', UserRoles.DEV),
  isPO: computed.equal('role', UserRoles.PO),
});

export default User;
