import "phaser";
import { GameScene } from "../../../scenes/gameScene";
import { Bullet } from '../bullet';

export class BulletBasic extends Bullet {
  name: string = 'bullet-basic';
  speed: number = Phaser.Math.GetSpeed(1000, 1);

  constructor(scene: GameScene, x: number, y: number, type: string, frame?: string | number) {
    super(scene, x, y, type, frame);
  }
}
