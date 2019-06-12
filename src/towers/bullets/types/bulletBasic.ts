import "phaser";
import { GameScene } from "../../../scenes/gameScene";
import { Bullet } from '../bullet';

export class BulletBasic extends Bullet {
  name: string = 'bullet-basic';
  speed: number = Phaser.Math.GetSpeed(500, 1);
  bulletParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    follow: this,
    followOffset: {x: 16, y: 16},
    lifespan: 10,
    speed: 10,
    scale: 0.3,
  }
  explosionParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    frequency: -1,
    lifespan: 100,
    scale: 0.2,
    speed: 100
  };

  constructor(scene: GameScene, x: number, y: number, type: string, frame?: string | number) {
    super(scene, x, y, type, frame);
  }
}
