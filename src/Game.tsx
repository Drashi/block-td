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
      scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CONFIG.GAME_WIDTH,
        height: CONFIG.GAME_HEIGHT,
        max: CONFIG.GAME_WIDTH
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
    return (
      <div
        id="game"
        style={{
          maxWidth: CONFIG.GAME_WIDTH,
          maxHeight: CONFIG.GAME_HEIGHT,
          margin: "auto"
        }}
      />
    );
  }
}