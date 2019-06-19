import "phaser";
import { GameScene } from "../scenes/gameScene";

export class Base extends Phaser.GameObjects.Sprite {
  scene: GameScene;
  baseParticleManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
  baseParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  baseOnHitParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  baseExplosionParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  baseParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    alpha: 1,
    lifespan: 1000,
    scale: 0.2,
    speed: 10,
    frequency: 10,
    x: this.x + 26,
    y: this.y - 6
  };
  baseOnHitParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    alpha: 0.8,
    lifespan: 100,
    scale: 0.5,
    speed: 200,
    frequency: -1
  };
  baseExplosionParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    alpha: 1,
    lifespan: 2000,
    scale: 0.5,
    speed: 100,
    frequency: -1
  };

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'base');
    this.scene = scene;

    const offset = {
      x: this.originX * this.displayWidth,
      y: (this.originY - 1) * this.displayHeight
    };
    this.x += offset.x;
    this.y += offset.y;

    scene.physics.add.existing(this);

    this.baseParticleManager = this.scene.add.particles('particle-blue');
    this.baseParticleManager.setDepth(1);
    this.baseParticles = this.baseParticleManager.createEmitter(this.baseParticlesConfig);
    this.baseOnHitParticles = this.baseParticleManager.createEmitter(this.baseOnHitParticlesConfig);
    this.baseExplosionParticles = this.baseParticleManager.createEmitter(this.baseExplosionParticlesConfig);
  }

  onHit(): void {
    if (!this.scene.ending) {
      this.baseOnHitParticles.explode(20, this.x + 10, this.y + 10);
      this.scene.sound.play('base-hit');
    }
  }

  onExplosion(): void {
    this.baseParticles.stop();
    this.baseParticles.killAll();
    this.baseOnHitParticles.stop();
    this.baseOnHitParticles.killAll();
    this.baseExplosionParticles.explode(100, this.x + 10, this.y + 10);
    this.scene.sound.play('base-explosion');
  }
}
