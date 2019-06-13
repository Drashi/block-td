import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { IconCounter } from "./iconCounter";

export class HealthInfo extends IconCounter {
  constructor(scene: GameScene, x: number, y: number, initialValue: number) {
    super(scene, x, y, initialValue, 'icon-health');
    this.icon.setScale(0.47);
    this.text.setX(this.icon.displayWidth + 10);
  }
}
