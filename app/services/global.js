import Service from '@ember/service';

export default Service.extend({
  currentUser: null,
  allStories: null,
  currentSprint: null,

  notification: null,

  init() {
    this._super(...arguments);
    this.notification = {
      alertClass: 'hide',
      title: '',
      text: ''
    };
  },

  notificationSuccess(title, text) {
    this.set('notification.title', title);
    this.set('notification.text', text);
    this.set('notification.alertClass', 'show');
  },

});
