import FixtureAdapter from 'ember-data-fixture-adapter';

export default FixtureAdapter.extend({
  findRecord(store, typeClass, id) {
    return this.find(store, typeClass, id);
  },

  query(store, typeClass, query) {
    return this.findQuery(store, typeClass, query);
  }
});
//import DS from 'ember-data';

// export default DS.JSONAPIAdapter.extend({
// });
