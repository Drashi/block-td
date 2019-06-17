import * as React from "react";
import "phaser";
import { CONFIG } from "./config";
import { BootScene } from "./scenes/bootScene";
import { TitleScene } from "./scenes/titleScene";
import { GameScene } from "./scenes/gameScene";

export interface GameProps {}

export default class Game extends React.Component<GameProps, any> {
  componentDidMount() {
    const phaserConfig: Phaser.Types.Core.GameConfig = {
      title: "Phaser TD",
      width: CONFIG.GAME_WIDTH,
      height: CONFIG.GAME_HEIGHT,
      parent: "game",
      physics: {
        default: "arcade",
        arcade: {
          debug: false
        }
      },
      scene: [new BootScene(), new TitleScene(), new GameScene()],
      backgroundColor: "#18216D"
    };

    new Phaser.Game(phaserConfig);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="game" />;
  }
}