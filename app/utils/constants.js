const UserConstants = {
  ROLES: {
    DEV: 'DEV',
    PO: 'PO'
  }
}

const StoryCommentsConstants = {
  OPINION_TYPES: {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE'
  }
}

const StoryWeights = {
  BENEFIT: 2,
  PENALTY: 1,
  COST: 1,
  RISK: 0.5
}

export { UserConstants, StoryCommentsConstants, StoryWeights };
