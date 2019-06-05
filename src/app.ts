import "phaser";
import { GameScene } from "./gameScene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Phaser TD",
  width: 820,
  height: 660,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [new GameScene()],
  backgroundColor: "#18216D"
};

export class PhaserTDGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new PhaserTDGame(config);
};
