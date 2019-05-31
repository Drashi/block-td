import "phaser";
import { GameScene } from '../gameScene';
import { Enemy } from '../enemies/enemy';
import { BulletManager } from './bullets/bulletManager';
import { Bullet } from './bullets/bullet';
import MapCoordinates from '../interfaces/mapCoordinates';

export class Tower extends Phaser.Physics.Arcade.Image {
  scene: GameScene;
  name: string;
  damage: number;
  attackSpeed: number;
  radiusSize: number;
  placed: boolean = false;
  attacking: boolean = false;
  attackDelay: number = 0;
  attackAngle: number;
  radius: Phaser.GameObjects.Arc | any;
  target: Enemy;
  bulletType: string;
  bulletManager: BulletManager;

  constructor(scene: GameScene, position: MapCoordinates, type: string) {
    super(scene, position.x, position.y, type);
    this.setDepth(1);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update(time: any) {
    if (this.isAttacking() && !this.isTargetInRadius())
      this.stopAttacking();
    
    for (let enemies of this.scene.enemyManager.enemies.values()) {
      this.scene.physics.overlap(enemies, this.getRadius(), this.onTowerRadiusReached, null, this);
      this.scene.physics.overlap(enemies, this.getBullets(), this.onEnemyHit, null, this);
    }

    if (this.isAttacking() && time > this.attackDelay) {
      this.shoot();
      this.attackDelay = time + this.attackSpeed;
    }
  }

  set(position: MapCoordinates): void {
    this.setPosition(position.x, position.y);
    this.setRadius();
    this.setBullets();
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
    const towerCenter = this.getCenter();
    const targetCenter = this.target.getCenter();
    this.attackAngle = Phaser.Math.Angle.Between(towerCenter.x, towerCenter.y, targetCenter.x, targetCenter.y);

    const bullet = this.bulletManager.getBullet();

    if (bullet)
      bullet.fire(towerCenter.x, towerCenter.y, this.attackAngle, this.radiusSize);
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

  onTowerRadiusReached(radius: Phaser.GameObjects.Arc, target: Enemy): void {
    if (!this.isAttacking())
      this.attack(target);
  }

  onEnemyHit(enemy: Enemy, bullet: Bullet): void {
    if (bullet.active) {
      enemy.onHit(bullet.damage);
      bullet.setActive(false);
      bullet.setVisible(false);
    }
  }
}
