import DS from 'ember-data';
import { computed } from '@ember/object';

const Story = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  acceptance: DS.attr('string'),
  wireframes: DS.attr('string'),

  votes: DS.hasMany('story-vote', {async: true, inverse: null}),
  comments: DS.hasMany('story-comment', {async: true, inverse: null}),

  isVoted: computed('votes', function() {
    return this.get('votes').any(vote => vote.get('user.id') == this.get('diGlobal.currentUser.id'))
  })
});

export default Story;
