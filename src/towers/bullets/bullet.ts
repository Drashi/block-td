import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class Bullet extends Phaser.Physics.Arcade.Image {
  scene: GameScene;
  name: string;
  speed: number;
  damage: number;
  dx: number = 0;
  dy: number = 0;
  lifespan = 0;

  constructor(scene: GameScene, x: number, y: number, type: string, frame?: string | number) {
    super(scene, x, y, type, frame);
    this.setDepth(1);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
  }

  fire(x: number, y: number, angle: number, radius: number): void {
    this.setActive(true);
    this.setVisible(true);

    this.setPosition(x - this.width / 2, y - this.height / 2);

    this.dx = Math.cos(angle);
    this.dy = Math.sin(angle);

    this.lifespan = radius / this.speed;
  }

  setDamage(damage: number): void {
    this.damage = damage;
  }

  update(time: any, delta: any): void { 
    this.lifespan -= delta;
 
    this.x += this.dx * (this.speed * delta);
    this.y += this.dy * (this.speed * delta);

    if (this.lifespan <= 0 || this.isOutOfMap()) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  isOutOfMap() {
    const bulletBounds = this.getBounds();
    const mapBounds: any = {
      top: this.scene.mapManager.mapBounds.getBounds().getLineA(),
      right: this.scene.mapManager.mapBounds.getBounds().getLineB(),
      bottom: this.scene.mapManager.mapBounds.getBounds().getLineC(),
      left: this.scene.mapManager.mapBounds.getBounds().getLineD()
    }

    return (Phaser.Geom.Intersects.LineToRectangle(mapBounds.top, bulletBounds) ||
            Phaser.Geom.Intersects.LineToRectangle(mapBounds.right, bulletBounds) ||
            Phaser.Geom.Intersects.LineToRectangle(mapBounds.bottom, bulletBounds) ||
            Phaser.Geom.Intersects.LineToRectangle(mapBounds.left, bulletBounds));
  }
}
