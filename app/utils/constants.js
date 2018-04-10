const UserRoles = {
  DEV: 'DEV',
  PO: 'PO'
};

const UserActions = {
  STORY_VOTE: {
    label: 'Deu opinião na estória',
    value: 'STORY_VOTE',
    points: 80
  },
  ADD_COMMENT: {
    label: 'Comentou na estória',
    value: 'ADD_COMMENT',
    points: 20
  },
  ADD_COMMENT_OPINION: {
    label: 'Avaliou comentário da estória',
    value: 'ADD_COMMENT_OPINION',
    points: 5
  },
  RECEIVE_COMMENT_LIKE: {
    label: 'Comentário bem avaliado',
    value: 'RECEIVE_COMMENT_LIKE',
    points: 5
  },
  RECEIVE_COMMENT_DISLIKE: {
    label: 'Comentário mal avaliado',
    value: 'RECEIVE_COMMENT_DISLIKE',
    points: -3
  },
  VIEW_AC: {
    label: 'Consultou critérios de aceitação da estória',
    value: 'VIEW_AC',
    points: 10
  },
  VIEW_WIREFRAMES: {
    label: 'Consultou os wireframes da estória',
    value: 'VIEW_WIREFRAMES',
    points: 10
  },
  LOGIN: {
    label: 'Efetou login no sistema',
    value: 'LOGIN',
    points: 2
  },
  FIRST_COMMENT: {
    label: 'Primeiro a comentar na estória',
    value: 'FIRST_COMMENT',
    points: 25
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
