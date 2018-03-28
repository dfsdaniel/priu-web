const UserRoles = {
  DEV: 'DEV',
  PO: 'PO'
};

const UserActions = {
  STORY_VOTE: {
    value: 'STORY_VOTE',
    points: 80
  },
  ADD_COMMENT: {
    value: 'ADD_COMMENT',
    points: 20
  },
  ADD_COMMENT_OPINION: {
    value: 'ADD_COMMENT_OPINION',
    points: 5
  },
  RECEIVE_COMMENT_LIKE: {
    value: 'RECEIVE_COMMENT_LIKE',
    points: 5
  },
  RECEIVE_COMMENT_DISLIKE: {
    value: 'RECEIVE_COMMENT_DISLIKE',
    points: -10
  },
  VIEW_AC: {
    value: 'VIEW_AC',
    points: 10
  },
  VIEW_WIREFRAMES: {
    value: 'VIEW_WIREFRAMES',
    points: 10
  },
  LOGIN: {
    value: 'LOGIN',
    points: 2
  }
};

const StoryCommentsConstants = {
  OPINION_TYPES: {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE'
  }
};

const StoryWeights = {
  BENEFIT: 2,
  PENALTY: 1,
  COST: 1,
  RISK: 0.5
};

export { UserRoles, StoryCommentsConstants, StoryWeights, UserActions };
