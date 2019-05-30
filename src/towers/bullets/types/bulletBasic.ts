import "phaser";
import { Bullet } from '../bullet';

export class BulletBasic extends Bullet {
  name: string = 'bullet_basic';
  speed: number = Phaser.Math.GetSpeed(1000, 1);

  constructor(scene: Phaser.Scene, x: number, y: number, type: string, frame?: string | number) {
    super(scene, x, y, type, frame);
  }
}
