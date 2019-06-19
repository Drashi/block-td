import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class StartWaveButton extends Phaser.GameObjects.Container {
  scene: GameScene;
  ready: boolean;
  button: Phaser.GameObjects.Image;
  particlesRectangle: Phaser.Geom.Rectangle;
  buttonParticlesManager: Phaser.GameObjects.Particles.ParticleEmitterManager;
  buttonParticles: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;

    this.setButton();
    this.setParticles();
    scene.add.existing(this);

    this.ready = true;
    this.add([this.button, this.buttonParticlesManager]);
  }

  setButton(): void {
    this.button = new Phaser.GameObjects.Image(this.scene, this.x, this.y, 'button-start-wave');
    this.button.setPosition(this.button.x - this.button.width / 2 - 14, this.y + this.button.height / 2);
    this.button.setOrigin(0.5)
    this.button.setInteractive();
    this.button.on('pointerdown', () => {
      if (!this.scene.waveActive) {
        this.scene.enemyManager.startWave();
        this.buttonParticles.stop();
        this.setAlpha(0.5);
        this.ready = false;
      }
    }, this);
  }

  setParticles(): void {
    this.particlesRectangle = this.button.getBounds();
    this.buttonParticlesManager = this.scene.add.particles('particle-red');
    this.buttonParticlesManager.setDepth(0);
    this.buttonParticles = this.buttonParticlesManager.createEmitter({
      blendMode: 'ADD',
      alpha: 0.05,
      scale: { start: 0.2, end: 0 },
      speed: { min: -30, max: 30 },
      quantity: 50,
      emitZone: { type: 'edge', source: this.particlesRectangle, quantity: 50 }
    });
  }

  updateActive(active: boolean): void {
    if (active && this.ready === true) {
      this.setAlpha(0.5);
      this.buttonParticles.stop();
      this.ready = false;
    } else if (!active && this.ready === false) {
      this.setAlpha(1);
      this.buttonParticles.start();
      this.ready = true;
    }
  }
}
