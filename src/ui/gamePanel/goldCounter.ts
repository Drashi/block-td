import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class GoldCounter extends Phaser.GameObjects.Container {
  scene: GameScene;
  counter: number = 0;
  icon: Phaser.GameObjects.Image;
  text: Phaser.GameObjects.Text;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.counter = scene.gold;

    this.icon = new Phaser.GameObjects.Image(scene, 0, 0, 'icon-gold');
    this.icon.setOrigin(0);
    this.icon.setScale(0.8);

    this.text = new Phaser.GameObjects.Text(scene, this.icon.width + 10, 0, this.counter.toString(), {
      fontFamily: '"Open-Sans"',
      fontSize: '21px'
    });
    this.text.setOrigin(0.18);

    this.add([this.icon, this.text]);
    scene.add.existing(this);
  }

  updateCounter(): void {
    this.counter = this.scene.gold;
    this.text.setText(this.counter.toString());
  }
}