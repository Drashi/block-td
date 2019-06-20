import "phaser";
import store from '../store';
import { Unsubscribe } from "redux";
import { CONFIG } from "../config";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: "TitleScene"
    });

    store.dispatch({ type: 'MENU'});
    const unsubscribe: Unsubscribe = store.subscribe(() => {
      if (store.getState().gameStarted && !store.getState().gameOver) {
        this.scene.switch('GameScene');
        unsubscribe();
      }
    });
  }

  create() {
    const camera = this.cameras.add(0, 0, CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);

    const background = this.add.image(0, 0, 'background-menu');
    background.setPosition(0 + background.width / 2, 0 + background.height / 2);
    background.setDepth(1);
  }
}
