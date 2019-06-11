import "phaser";
import { GameScene } from "./scenes/gameScene";
import { CONFIG } from "./config";

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
  scene: [new GameScene()],
  backgroundColor: "#18216D"
};

export class PhaserTDGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new PhaserTDGame(phaserConfig);
};
