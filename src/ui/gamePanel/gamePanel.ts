import "phaser";

export class GamePanel extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  background: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    scene.add.existing(this);
  }
}
