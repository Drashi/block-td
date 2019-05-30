import "phaser";
import { Enemy } from '../enemies/enemy';
import { BulletManager } from './bullets/bulletManager';
import MapCoordinates from '../interfaces/mapCoordinates';

export class Tower extends Phaser.Physics.Arcade.Image {
  name: string;
  damage: number;
  attackSpeed: number;
  radiusSize: number;
  placed: boolean = false;
  attacking: boolean = false;
  attackInterval: number;
  attackDelay: boolean;
  attackAngle: number;
  radius: Phaser.GameObjects.Arc | any;
  target: Enemy;
  bulletType: string;
  bulletManager: BulletManager;

  constructor(scene: Phaser.Scene, position: MapCoordinates, type: string) {
    super(scene, position.x, position.y, type);
    this.setDepth(1);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  setRadius(): void {
    const center = this.getCenter();
    this.radius = this.scene.add.circle(center.x, center.y, this.radiusSize, 0x6666, 0.5);
    this.scene.physics.add.existing(this.radius);
    this.radius.body.setCircle(this.radiusSize, -(this.radiusSize / 2), -(this.radiusSize / 2));
  }

  getBullets(): Phaser.Physics.Arcade.Group {
    return this.bulletManager.getBullets();
  }

  setBullets(): void {
    this.bulletManager = new BulletManager(this.scene, this.bulletType, this.damage);
  }

  shoot(): void {
    if (!this.attackDelay) {
      this.attackDelay = true;

      const towerCenter = this.getCenter();
      const targetCenter = this.target.getCenter();
      this.attackAngle = Phaser.Math.Angle.Between(towerCenter.x, towerCenter.y, targetCenter.x, targetCenter.y);
  
      const bullet = this.bulletManager.getBullet();

      if (bullet)
        bullet.fire(towerCenter.x, towerCenter.y, this.attackAngle, this.radiusSize);

      setTimeout(() => this.attackDelay = false, this.attackSpeed);
    }
  }

  attack(target: Enemy) {
    this.attacking = true;
    this.target = target;
    this.attackInterval = window.setInterval(() => this.shoot(), 10);
    this.shoot();
  }

  stopAttacking(): void {
    clearInterval(this.attackInterval);
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
