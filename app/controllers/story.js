import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
  	Ember.run.scheduleOnce('afterRender', this, function() {
  		$("#ex8").slider({
  			tooltip: 'always'
      });
		});  	
  }
});