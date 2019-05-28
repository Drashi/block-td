import "phaser";
import { Enemy } from '../enemies/enemy';
import MapCoordinates from '../interfaces/mapCoordinates';

export class Tower extends Phaser.Physics.Arcade.Image {
  placed: boolean = false;
  radius: Phaser.GameObjects.Arc | any;
  radiusSize: number;
  attacking: boolean = false;
  target: Enemy;

  constructor(scene: Phaser.Scene, position: MapCoordinates, type: string) {
    super(scene, position.x, position.y, type);
    this.setDepth(1);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.radius = scene.add.circle(this.x + 16, this.y + 16, this.radiusSize, 0x6666, 0.5);
    scene.physics.add.existing(this.radius);
    this.radius.body.setCircle(this.radiusSize, -(this.radiusSize / 2), -(this.radiusSize / 2));
  }

  attack(target: Enemy) {
    this.target = target;
    this.attacking = true;
  }

  stopAttacking(): void {
    this.attacking = false;
    this.target = null;
  }

  isAttacking(): boolean {
    return this.attacking;
  }

  isTargetInRadius(): boolean {
    return this.target ? this.scene.physics.overlap(this.target, this.getRadius()) : false;
  }

  getRadius(): Phaser.GameObjects.Arc {
    return this.radius;
  }
}
