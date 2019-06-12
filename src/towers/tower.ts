import "phaser";
import { GameScene } from '../scenes/gameScene';
import { Enemy } from '../enemies/enemy';
import { BulletManager } from './bullets/bulletManager';
import { Bullet } from './bullets/bullet';
import MapCoordinates from '../util/interfaces/mapCoordinates';

export class Tower extends Phaser.Physics.Arcade.Image {
  scene: GameScene;
  name: string;
  damage: number;
  attackSpeed: number;
  radiusSize: number;
  cost: number;
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
    this.setOrigin(0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update(time: any) {
    if (this.placed) {
      if (this.isAttacking() && (!this.isTargetInRadius() || !this.target.active))
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
  }

  prepare(position: MapCoordinates): void {
    this.placed = false;
    this.setAlpha(0.5);
    this.setPosition(position.x, position.y);
    this.setRadius();
  }

  place(): void {
    this.radius.setVisible(false);
    this.setBullets();
    this.setAlpha(1);
    this.placed = true;
    this.scene.gold -= this.cost;
  }

  setRadius(): void {
    if (!this.radius) {
      this.radius = this.scene.add.circle(this.x + this.width / 2, this.y + this.width / 2, this.radiusSize, 0x6666, 0.5);
      this.scene.physics.add.existing(this.radius);
      this.scene.mapManager.mapContainer.add(this.radius);
    } else {
      this.radius.setRadius(this.radiusSize);
      this.radius.setPosition(this.x + this.width / 2, this.y + this.width / 2);
    }

    this.radius.body.setCircle(this.radiusSize, -(this.radiusSize / 2), -(this.radiusSize / 2));
    this.radius.setVisible(true);
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
    if (target.active && !this.isAttacking())
      this.attack(target);
  }

  onEnemyHit(enemy: Enemy, bullet: Bullet): void {
    if (bullet.active) {
      enemy.onHit(bullet.damage);
      bullet.onHit();
    }
  }
}
