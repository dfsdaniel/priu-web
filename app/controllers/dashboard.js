import Controller from '@ember/controller';
import ObjectProxy from '@ember/object/proxy'
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { StoryWeights } from 'priu-web/utils/constants';

export default Controller.extend({
  allStories: alias('diGlobal.allStories'),
  currentSprint: alias('diGlobal.currentSprint'),

  allActions: alias('diGame.allActions'),
  rankedUsers: alias('diGame.rankedUsers'),
  topCommenters: alias('diGame.topCommenters'),

  getPriority() {
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

    // Ajuste para quando não houver nenhum voto ainda para a estória
    totalValueSum = totalValueSum == 0 ? 1 : totalValueSum;
    riskSum = riskSum == 0 ? 1 : riskSum;
    costSum = costSum == 0 ? 1 : costSum;

    const rankedStories = allStories.map((story) => {
      const totalValue = story.get('averageVotes').benefit * StoryWeights.BENEFIT
        + story.get('averageVotes').penalty * StoryWeights.PENALTY;
      const percentValue = (totalValue * 100) / totalValueSum;

      const percentRisk = (story.get('averageVotes').risk * 100) / riskSum;
      const percentCost = (story.get('averageVotes').cost * 100) / costSum;


      let auxPercents = ((percentCost * StoryWeights.COST) + (percentRisk * StoryWeights.RISK));
      auxPercents = auxPercents == 0 ? 1 : auxPercents;

      const priority = percentValue / auxPercents;

      return new ObjectProxy({
        content: story,
        priority: parseFloat(priority).toFixed(2)
      });
    });

    return rankedStories.sort((storyA, storyB) => {
      return storyA.priority < storyB.priority;
    });
  },

  rankedStories: computed('allStories.@each.averageVotes', function() {
    return this.getPriority();
  }),

  top3: computed('rankedUsers', function() {
    return this.get('rankedUsers').slice(0, 3);
  }),

  restBoard: computed('rankedUsers', function() {
    return this.get('rankedUsers').slice(3, 6);
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
