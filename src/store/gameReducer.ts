import { CONFIG } from "../config";
import CanvasProps from "../util/interfaces/canvasProps";

export const GAME_RESIZE = "GAME_RESIZE";
export const MENU = "MENU";
export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";

export const gameResize = (payload) => ({
  type: GAME_RESIZE,
  payload
});

export const menu = () => ({
  type: MENU
});

export const startGame = () => ({
  type: START_GAME
});

export const gameOver = () => ({
  type: GAME_OVER
});

interface StateProps {
  canvasProps: CanvasProps,
  menu: boolean,
  gameStarted: boolean,
  gameOver: boolean
}

const initState: StateProps = {
  canvasProps: {
    width: CONFIG.GAME_WIDTH,
    height: CONFIG.GAME_HEIGHT,
    margin: {
      top: 0,
      left: 0
    }
  },
  menu: false,
  gameStarted: false,
  gameOver: false
};

export const gameReducer = (
  state = initState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case GAME_RESIZE:
      return { ...state, canvasProps: action.payload };

    case MENU:
      return { ...state, menu: true, gameStarted: false, gameOver: false };

    case START_GAME:
      return { ...state, menu: false, gameStarted: true, gameOver: false };

    case GAME_OVER:
      return { ...state, menu: false, gameStarted: true, gameOver: true };

    default:
      return state;
  }
};
