import "phaser";
import * as EasyStar from "easystarjs";
import MapCoordinates from '../interfaces/mapCoordinates';

export class Enemy extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, spawnPosition: MapCoordinates, type: string) {
    super(scene, spawnPosition.x, spawnPosition.y, type);
    this.setDepth(1);
    this.setOrigin(0, 0.5);
  
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  spawn(spawnPosition: MapCoordinates, basePosition: MapCoordinates, finder: EasyStar.js): void {
    this.calculatePosition(spawnPosition, basePosition, this, finder);
  }

  private calculatePosition(from: MapCoordinates, to: MapCoordinates, enemy: Enemy, finder: EasyStar.js): void {
    const fromX = Math.floor(from.x / 32);
    const fromY = Math.floor(from.y / 32);
    const toX = Math.floor(to.x / 32);
    const toY = Math.floor(to.y / 32);

    finder.findPath(fromX, fromY, toX, toY, (path) => {
      if (path !== null)
        this.move(path, enemy);
    });

    finder.calculate();
  }

  private move(path: MapCoordinates[], enemy: Enemy): void {
    const tweens = [];

    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i+1].x;
      const ey = path[i+1].y;

      tweens.push({
        targets: enemy,
        x: {value: ex * 32, duration: 200},
        y: {value: ey * 32, duration: 200}
      });
    }

    this.scene.tweens.timeline({
      tweens: tweens
    });
  }
}