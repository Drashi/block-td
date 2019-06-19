import "phaser";
import { GameScene } from "../scenes/gameScene";

export class Spawn extends Phaser.GameObjects.Sprite {
  spawnParticleManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
  spawnParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  spawnOnSpawnParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  spawnParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    on: false,
    blendMode: 'ADD',
    alpha: 0.05,
    lifespan: 1000,
    scale: 0.5,
    speed: 20,
    frequency: 10,
    x: this.x + 26,
    y: this.y - 6
  };
  spawnOnSpawnParticlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    blendMode: 'ADD',
    alpha: {start: 0.5, end: 0},
    lifespan: 500,
    scale: 0.5,
    speed: 50,
    frequency: -1
  };

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'spawn');

    const offset = {
      x: this.originX * this.displayWidth,
      y: (this.originY - 1) * this.displayHeight
    };
    this.x += offset.x;
    this.y += offset.y;

    this.spawnParticleManager = this.scene.add.particles('particle-red');
    this.spawnParticleManager.setDepth(1);
    this.spawnParticles = this.spawnParticleManager.createEmitter(this.spawnParticlesConfig);
    this.spawnOnSpawnParticles = this.spawnParticleManager.createEmitter(this.spawnOnSpawnParticlesConfig);
  }

  onSpawn(): void {
    this.spawnOnSpawnParticles.explode(20, this.x + 10, this.y + 10);
    this.scene.sound.play('spawn', { volume: 0.05 });
  }

  setActivity(active: boolean): void {
    if (active)
      this.spawnParticles.start();
    else
      this.spawnParticles.stop();
  }
}
