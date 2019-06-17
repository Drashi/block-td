import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class StartWaveButton extends Phaser.GameObjects.Image {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'button-start-wave');
    this.setPosition(x, y + this.height / 2);
    scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', () => {
      if (!scene.waveActive)
        scene.enemyManager.startWave();
    }, this);
  }

  updateActive(active: boolean): void {
    if (active)
      this.setAlpha(0.5);
    else
      this.setAlpha(1);
  }
}
