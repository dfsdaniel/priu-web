import Component from '@ember/component';
import ObjectProxy from '@ember/object/proxy'
import { computed } from '@ember/object';


export default Component.extend({
	classNames: 'stories-progress',

	stories: null,
	currentUser: null,

	storiesWithUserInfo: computed('stories', function() {
		return this.get('stories').map((st) => {
			return new ObjectProxy({
				content: st,
				voted: st.get('votes').any(st => st.get('user.id') == this.get('currentUser.id'))
			});
		});
	})
});
