import "phaser";
import * as EasyStar from "easystarjs";
import { Enemy } from "./enemy";
import { Phaserguy } from "./types/phaserguy";
import MapCoordinates from "../interfaces/mapCoordinates";

export class EnemyManager {
  enemies: Enemy[];
  spawnedEnemies: number;
  spawnInterval: number;

  constructor() {
    this.enemies = [];
  }

  baseCollisionDetection(scene: Phaser.Scene, base: Phaser.GameObjects.Sprite[], ): void {
    for (let i = 0; i < this.enemies.length; i++)
      scene.physics.overlap(this.enemies[i], base, this.onBaseReached(this.enemies[i]), null, this);
  }

  startWave(scene: Phaser.Scene, spawnPosition: MapCoordinates, basePosition: MapCoordinates, finder: EasyStar.js): void {
    this.spawnedEnemies = 0;
    this.spawnInterval = window.setInterval(() => {
      if (this.spawnedEnemies < 10) {
        let enemy = new Phaserguy(scene, spawnPosition);
        enemy.spawn(spawnPosition, basePosition, finder);
        this.enemies.push(enemy);
        this.spawnedEnemies++;
      } else {
        clearInterval(this.spawnInterval);
      }
    }, 1000);
  }

  onBaseReached(enemy: Enemy): () => void {
    return function () {
      enemy.destroy();
      this.enemies.splice(this.enemies.indexOf(enemy), 1);
    }
  }
}
