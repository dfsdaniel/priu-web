import Component from '@ember/component';

export default Component.extend({
	tagName: '',
	disabled: false,
	target: '',
	title: '',
    story: null,

    actions: {
        openModal() {
            const target = this.get('target');
            $(target).modal('show');

            this.get('diGame').regViewAcceptance(this.get('story'));
        }
    }
});
