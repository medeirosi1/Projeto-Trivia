const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PLAYER_DATA':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case 'SET_PLAYER_SCORE':
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default playerReducer;
