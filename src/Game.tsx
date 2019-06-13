import * as React from "react";
import "phaser";
import { BootScene } from "./scenes/bootScene";
import { GameScene } from "./scenes/gameScene";
import { CONFIG } from "./config";

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
      scene: [new BootScene(), new GameScene()],
      backgroundColor: "#18216D"
    };

    new Phaser.Game(phaserConfig);
  }

  shouldComponentUpdate() {
    return false;
  }

  public render() {
    return <div id="game" />;
  }
}