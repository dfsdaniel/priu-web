import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
	currentUser: alias('diGlobal.currentUser'),	

	email: '',
	password: '',
	errorMessage: '',

	onError(message) {
		this.set('errorMessage', message);
		this.set('loginButtonDisabled', false);
	},

	onSuccess() {
		this.setProperties({
			email: '',
			password: '',
			errorMessage: '',
			loginButtonDisabled: false
		});
	},

	loginButtonDisabled: false,

	actions: {
		login() {
			this.set('loginButtonDisabled', true);
			this.send('signIn', this.get('email'), this.get('password'), this.onSuccess.bind(this), this.onError.bind(this));
		}
	}
});
