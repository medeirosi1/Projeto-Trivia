const INITIAL_STATE = {
  playerData: {},
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PLAYER_DATA':
    return {
      ...state,
      playerData: action.playerData,
    };
  default:
    return state;
  }
};

export default playerReducer;
