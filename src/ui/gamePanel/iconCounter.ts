import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class IconCounter extends Phaser.GameObjects.Container {
  scene: GameScene;
  counter: number;
  icon: Phaser.GameObjects.Image;
  text: Phaser.GameObjects.Text;

  constructor(scene: GameScene, x: number, y: number, initialValue: number, icon: string) {
    super(scene, x, y);
    this.scene = scene;
    this.counter = initialValue;

    this.icon = new Phaser.GameObjects.Image(scene, 0, 0, icon);
    this.icon.setOrigin(0);
    this.icon.setScale(0.7);

    this.text = new Phaser.GameObjects.Text(scene, this.icon.displayWidth + 10, 0, this.counter.toString(), {
      fontFamily: '"Open-Sans"',
      fontSize: '20px'
    });
    this.text.setOrigin(0.18);

    this.add([this.icon, this.text]);
    scene.add.existing(this);
  }

  updateCounterValue(value: number): void {
    this.counter = value;
    this.text.setText(this.counter.toString());
  }
}