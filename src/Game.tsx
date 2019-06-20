import "phaser";
import * as React from "react";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";
import { gameResize } from './store/gameReducer';
import { CONFIG } from "./config";
import { BootScene } from "./scenes/bootScene";
import { TitleScene } from "./scenes/titleScene";
import { GameScene } from "./scenes/gameScene";

interface GameProps {
  gameResize
}

interface GameState {
  game: Phaser.Game
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props) {
    super(props);

    this.state = {
      game: null
    }
  }

  componentDidMount() {
    const phaserConfig: Phaser.Types.Core.GameConfig = {
      title: "Block TD",
      width: CONFIG.GAME_WIDTH,
      height: CONFIG.GAME_HEIGHT,
      parent: "game",
      physics: {
        default: "arcade",
        arcade: {
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: CONFIG.GAME_WIDTH,
        height: CONFIG.GAME_HEIGHT,
        max: {
          width: CONFIG.GAME_WIDTH,
          height: CONFIG.GAME_HEIGHT
        }
      },
      scene: [new BootScene(), new TitleScene(), new GameScene()],
      backgroundColor: "#18216D"
    };

    const game = new Phaser.Game(phaserConfig);
    this.setState({ game });

    window.addEventListener("resize", this.resize);
    screen.orientation.addEventListener("change", this.resize);
    setTimeout(() => this.resize(), 0);
  }

  resize = (): void => {
    setTimeout(() => {
      const { game } = this.state;

      if (game) {
        this.props.gameResize({
          width: parseInt(game.canvas.style.width, 10),
          height: parseInt(game.canvas.style.height, 10),
          margin: {
            top: parseInt(game.canvas.style.marginTop, 10),
            left: parseInt(game.canvas.style.marginLeft, 10)
          }
        })
      }
    }, 0);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        id="game"
        style={{
          margin: "auto"
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => (bindActionCreators({
  gameResize: (size) => dispatch(gameResize(size))
}, dispatch));

export default connect(null, mapDispatchToProps)(Game);
