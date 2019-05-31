import "phaser";
import { GameScene } from "../gameScene";
import MapCoordinates from '../interfaces/mapCoordinates';

export class Enemy extends Phaser.Physics.Arcade.Image {
  scene: GameScene;
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

  set(spawnPosition: MapCoordinates, basePosition: MapCoordinates): void {
    this.setPosition(spawnPosition.x, spawnPosition.y);
    this.scene.pathFinder.calculatePosition(spawnPosition, basePosition, this.move);
    this.setActive(true);
    this.setVisible(true);
  }

  onHit(damage: number) {
    this.health -= damage;
    if (!this.isAlive())
      this.destroy();
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
        x: {value: ex * this.scene.map.tileWidth},
        y: {value: ey * this.scene.map.tileHeight}
      });
    }

    this.scene.tweens.timeline({
      targets: this,
      totalDuration: path.length * 2500 / this.speed,
      tweens: tweens
    });
  }

  update(): void {
    this.scene.physics.overlap(this, this.scene.base, this.onBaseReached, null, this);
  }

  onBaseReached(enemy: Enemy): void {
    if (enemy.active) {
      enemy.setActive(false);
      enemy.setVisible(false);
    }
  }
}
