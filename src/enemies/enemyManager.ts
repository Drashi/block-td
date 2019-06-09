import "phaser";
import { GameScene } from "../gameScene";
import { EnemyPhaserguy } from "./types/enemyPhaserguy";

export class EnemyManager {
  enemyTypes: {} = {
    'phaserguy': {class: EnemyPhaserguy, texture: 'phaserguy'}
  };

  scene: GameScene;
  enemies: Map<string, Phaser.Physics.Arcade.Group>;
  spawnedEnemies: number;
  spawnInterval: number;

  constructor(scene: GameScene) {
    this.enemies = new Map();
    this.scene = scene;
  }

  spawnEnemy(enemyType: string): void {
    let enemy;
  
    if (this.enemies.has(enemyType))  {
      enemy = this.enemies.get(enemyType).get();
    } else {
      const group = this.scene.physics.add.group({ classType: this.enemyTypes[enemyType].class as any, defaultKey: this.enemyTypes[enemyType].texture, runChildUpdate: true });
      this.enemies.set(enemyType, group);
      enemy = this.enemies.get(enemyType).get();
    }

    this.scene.mapManager.mapContainer.add(enemy);
    enemy.set();
  }

  startWave(): void {
    let spawnedEnemies = 0;
    const spawnInterval = window.setInterval(() => {
      if (spawnedEnemies < 10) {
        spawnedEnemies++;
        this.spawnEnemy('phaserguy');
      } else {
        clearInterval(spawnInterval);
      }
    }, 1000);
  }
}
