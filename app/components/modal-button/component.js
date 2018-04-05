import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
	tagName: '',
	disabled: false,
	target: '',
	title: '',
    story: null,

    actions: {
        openModal() {
            const target = this.get('target');
            $(`#${target}`).modal('show');

            if (target == 'acceptanceModal') {
                this.get('diGame').regViewAcceptance(this.get('story'));
            } else if (target == 'wireframesModal') {
                this.get('diGame').regViewWireframes(this.get('story'));
            }
        }
    }
});
