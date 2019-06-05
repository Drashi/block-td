import "phaser";
import { GameScene } from "../gameScene";
import { EnemyPhaserguy } from "./types/enemyPhaserguy";

export class EnemyManager {
  enemyTypes: {} = {
    'phaserguy': {class: EnemyPhaserguy, texture: 'phaserguy'}
  };

  enemies: Map<string, Phaser.Physics.Arcade.Group>;
  spawnedEnemies: number;
  spawnInterval: number;

  constructor() {
    this.enemies = new Map();
  }

  spawnEnemy(scene: GameScene, enemyType: string): void {
    let enemy;
  
    if (this.enemies.has(enemyType))  {
      enemy = this.enemies.get(enemyType).get();
    } else {
      this.enemies.set(enemyType, scene.physics.add.group({ classType: this.enemyTypes[enemyType].class as any, defaultKey: this.enemyTypes[enemyType].texture, runChildUpdate: true }));
      enemy = this.enemies.get(enemyType).get();
    }

    scene.mapContainer.add(enemy);
    const spawnPosition = scene.getTilePosition(scene.spawn.x, scene.spawn.y);
    const basePosition = scene.getTilePosition(scene.base.x, scene.base.y);
    enemy.set(spawnPosition, basePosition, scene.pathFinder);
  }

  startWave(scene: GameScene): void {
    this.spawnedEnemies = 0;
    this.spawnInterval = window.setInterval(() => {
      if (this.spawnedEnemies < 10) {
        this.spawnEnemy(scene, 'phaserguy');
        this.spawnedEnemies++;
      } else {
        clearInterval(this.spawnInterval);
      }
    }, 1000);
  }
}
