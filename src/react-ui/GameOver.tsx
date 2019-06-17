import * as React from 'react';
import { CONFIG } from '../config';

interface GameOverProps {
  leftOffset: number,
  onButtonClick: any
}

class GameOver extends React.Component<GameOverProps> {
  render() {
    const { leftOffset, onButtonClick } = this.props;
    const gameOverImage = require('../../assets/ui/react-ui/game-over.png');
    const buttonRestart = require('../../assets/ui/react-ui/button-restart.png');

    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          left: leftOffset,
          width: CONFIG.GAME_WIDTH,
          height: CONFIG.GAME_HEIGHT
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: CONFIG.GAME_WIDTH,
            height: CONFIG.GAME_HEIGHT,
            backgroundColor: "#000000",
            opacity: 0.5
          }}
         />
        <img src={ gameOverImage } style={{ alignSelf: "center", marginBottom: 40, zIndex: 1, WebkitUserSelect: "none" }} />
        <img src={ buttonRestart } style={{ alignSelf: "center", zIndex: 1, WebkitUserSelect: "none", cursor: "pointer" }} onClick={ onButtonClick } />
      </div>
    );
  }
}

export default GameOver;
