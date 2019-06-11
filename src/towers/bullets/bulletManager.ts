import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { Bullet } from './bullet';
import { BulletBasic } from './types/bulletBasic';

export class BulletManager {
  bulletTypes: {} = {
    'basic': {class: BulletBasic, texture: 'bullet-basic'}
  };
  scene: GameScene;
  bullets: Phaser.Physics.Arcade.Group;
  bulletDamage: number;

  constructor(scene: GameScene, bulletType: string, damage: number) {
    this.scene = scene;
    this.bullets = scene.physics.add.group({ classType: this.bulletTypes[bulletType].class as any, defaultKey: this.bulletTypes[bulletType].texture, runChildUpdate: true });
    this.bulletDamage = damage;
  }

  getBullet(): Bullet {
    const bullet = this.bullets.get();
    this.scene.mapManager.mapContainer.add(bullet);

    bullet.setDamage(this.bulletDamage);
    return bullet;
  }

  getBullets(): Phaser.Physics.Arcade.Group {
    return this.bullets;
  }
}
