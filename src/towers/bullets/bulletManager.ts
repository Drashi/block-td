import "phaser";
import { Bullet } from './bullet';
import { BulletBasic } from './types/bulletBasic';

export class BulletManager {
  bulletTypes: {} = {
    'basic': {class: BulletBasic, texture: 'bullet_basic'}
  };
  bullets: Phaser.Physics.Arcade.Group;
  bulletDamage: number;

  constructor(scene: Phaser.Scene, bulletType: string, damage: number) {
    this.bullets = scene.physics.add.group({ classType: this.bulletTypes[bulletType].class as any, defaultKey: this.bulletTypes[bulletType].texture, runChildUpdate: true });
    this.bulletDamage = damage;
  }

  getBullet(): Bullet {
    const bullet = this.bullets.get();
    bullet.setDamage(this.bulletDamage);
    return bullet;
  }

  getBullets(): Phaser.Physics.Arcade.Group {
    return this.bullets;
  }
}
