import * as React from 'react';
import { startGame } from '../store/gameReducer';
import { connect } from "react-redux";
import { CONFIG } from "../config";

interface UIProps {
  startGame: boolean;
  gameOver: boolean
}

function calculateLeftOffset() {
  return window.innerWidth / 2 - CONFIG.GAME_WIDTH / 2;
};

function UI({ startGame, gameOver }: UIProps) {
  const [leftOffset, setLeftOffset] = React.useState(calculateLeftOffset());
  const buttonRestart = require('../../assets/react-ui/button-restart.png');
  const gameOverImage = require('../../assets/react-ui/game-over.png');

  function handleResize() {
    setLeftOffset(calculateLeftOffset);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (!gameOver)
    return null;

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
          opacity: "0.5"
        }}
      />
      <img src={ gameOverImage } style={{ alignSelf: "center", marginBottom: 40, zIndex: 1, WebkitUserSelect: "none" }} />
      <img src={ buttonRestart } style={{ alignSelf: "center", zIndex: 1, WebkitUserSelect: "none" }} onClick={ startGame } />
    </div>
  );
}

const mapStateToProps = ({ startGame, gameOver }: UIProps) => ({
  startGame,
  gameOver
});

const mapDispatchToProps = {
  startGame
};

export default connect(mapStateToProps, mapDispatchToProps)(UI);
