import "phaser";
import { GameScene } from "../../gameScene";

export class startWaveButton extends Phaser.GameObjects.Image {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'button-start-wave');
    scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', () => scene.enemyManager.startWave(scene), this);
  }
}
