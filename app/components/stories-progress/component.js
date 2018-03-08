import Component from '@ember/component';
import ObjectProxy from '@ember/object/proxy'
import { computed } from '@ember/object';


export default Component.extend({
	classNames: 'stories-progress',

	stories: null,
	currentUser: null
});
