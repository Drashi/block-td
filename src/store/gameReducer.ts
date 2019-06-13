export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";

export const startGame = () => ({
  type: START_GAME
});

export const gameOver = () => ({
  type: GAME_OVER
});

interface StateProps {
  gameStarted: boolean,
  gameOver: boolean
}

const initState: StateProps = {
  gameStarted: false,
  gameOver: false
};

export const gameReducer = (
  state = initState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case START_GAME:
      return { ...state, gameStarted: true, gameOver: false };

    case GAME_OVER:
      return { ...state, gameStarted: false, gameOver: true };

    default:
      return state;
  }
};
