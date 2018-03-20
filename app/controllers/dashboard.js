import Controller from '@ember/controller';
import ObjectProxy from '@ember/object/proxy'
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { StoryWeights } from 'priu-web/utils/constants';

export default Controller.extend({
  allStories: alias('diGlobal.allStories'),
  currentSprint: alias('diGlobal.currentSprint'),

  rankedStories: computed('allStories', function() {
    const allStories = this.get('allStories');

    let totalValueSum = 0;
    let riskSum = 0;
    let costSum = 0;
    allStories.forEach((story) => {
      totalValueSum += (story.get('averageVotes').benefit * StoryWeights.BENEFIT)
      + (story.get('averageVotes').penalty * StoryWeights.PENALTY);
      riskSum += story.get('averageVotes').risk;
      costSum += story.get('averageVotes').cost;
    });

    const rankedStories = allStories.map((story) => {
      const totalValue = story.get('averageVotes').benefit * StoryWeights.BENEFIT
        + story.get('averageVotes').penalty * StoryWeights.PENALTY;
      const percentValue = (totalValue * 100) / totalValueSum;

      const percentRisk = (story.get('averageVotes').risk * 100) / riskSum;
      const percentCost = (story.get('averageVotes').cost * 100) / costSum;

      const priority = percentValue / ((percentCost * StoryWeights.COST) + (percentRisk * StoryWeights.RISK))

      return new ObjectProxy({
        content: story,
        priority: parseFloat(priority).toFixed(2)
      });
    });
    return rankedStories.sortBy('priority:desc');
  }),

  actions: {
    selectSprint(sprint) {
      this.set('currentSprint.isCurrent', false);
      this.get('currentSprint').save();

      sprint.set('isCurrent', true);
      sprint.save();

      this.send('refreshAppRoute');
    }
  }
});
