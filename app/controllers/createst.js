import Controller from '@ember/controller';

export default Controller.extend({
  id: '',
  name: '',
  role: 'DEV',
  photo: '',

  actions: {
    save() {
      const id = this.get('id');
      const name = this.get('name');
      const photo = this.get('photo');
      const role = this.get('role');

      const user = this.store.createRecord('user', {id, name, photo, role, isFirstLogin: true});
      user.save();

      this.setProperties({
        name: '',
        photo: '',
        role: '',
      });
    }
  }
});
