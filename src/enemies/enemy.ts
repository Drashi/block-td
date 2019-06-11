import "phaser";
import { GameScene } from "../scenes/gameScene";
import MapCoordinates from '../util/interfaces/mapCoordinates';

export class Enemy extends Phaser.Physics.Arcade.Image {
  scene: GameScene;
  initialHealth: number;
  initialSpeed: number;
  health: number;
  speed: number;

  constructor(scene: GameScene, x: number, y: number, type: string) {
    super(scene, x, y, type);
    this.setDepth(1);
    this.setOrigin(0, 0.5);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
  }

  init(): void {
    this.health = this.initialHealth;
    this.speed = this.initialSpeed;
    this.setPosition(this.scene.mapManager.spawnPosition.x, this.scene.mapManager.spawnPosition.y);
  }

  set(): void {
    this.init();
    this.scene.enemyManager.pathFinder.calculatePosition(this.scene.mapManager.spawnPosition, this.scene.mapManager.basePosition, this.move);
    this.setActive(true);
    this.setVisible(true);
  }

  reset(): void {
    this.setActive(false);
    this.setVisible(false);
    this.scene.tweens.killTweensOf(this);
    this.init();
  }

  onHit(damage: number) {
    this.health -= damage;
    if (!this.isAlive())
      this.reset();
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  move = (path: MapCoordinates[]): void => {
    const tweens = [];

    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i+1].x;
      const ey = path[i+1].y;

      tweens.push({
        x: {value: ex * this.scene.mapManager.map.tileWidth},
        y: {value: ey * this.scene.mapManager.map.tileHeight}
      });
    }

    this.scene.tweens.timeline({
      targets: this,
      totalDuration: path.length * 2500 / this.speed,
      tweens: tweens
    });
  }

  update(): void {
    this.scene.physics.overlap(this, this.scene.mapManager.base, this.onBaseReached, null, this);
  }

  onBaseReached(): void {
    if (this.active)
      this.reset();
  }
}
