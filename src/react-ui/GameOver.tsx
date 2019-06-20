import * as React from 'react';
import CanvasProps from "../util/interfaces/canvasProps";

interface GameOverProps {
  canvasProps: CanvasProps,
  onButtonClick: any
}

class GameOver extends React.Component<GameOverProps> {
  render() {
    const { canvasProps, onButtonClick } = this.props;
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
          top: 0,
          width: canvasProps.width,
          height: canvasProps.height,
          marginTop: canvasProps.margin.top,
          marginLeft: canvasProps.margin.left
        }}
      >
        <div
          style={{
            position: "absolute",
            width: canvasProps.width,
            height: canvasProps.height,
            backgroundColor: "#000000",
            opacity: 0.5
          }}
        />
        <img
          src={ gameOverImage }
          style={{
            width: "35%",
            alignSelf: "center",
            marginBottom: "5%",
            zIndex: 1,
            WebkitUserSelect: "none"
          }}
        />
        <img
          src={ buttonRestart }
          style={{
            width: "20%",
            alignSelf: "center",
            zIndex: 1,
            WebkitUserSelect: "none",
            cursor: "pointer"
          }}
          onClick={ onButtonClick }
        />
      </div>
    );
  }
}

export default GameOver;
