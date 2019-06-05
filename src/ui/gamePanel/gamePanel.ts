import "phaser";
import { GameScene } from "../../gameScene";
import { startWaveButton } from "./startWaveButton";

export class GamePanel extends Phaser.GameObjects.Container {
  scene: GameScene;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);

    this.add(new startWaveButton(scene, 85, 28));
  }
}
