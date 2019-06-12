import "phaser";
import { GameScene } from "../scenes/gameScene";
import { PathFinder } from "./pathFinder";
import { EnemyFloatingEye } from "./types/enemyFloatingEye";

export class EnemyManager {
  enemyTypes: {} = {
    'floating-eye': {class: EnemyFloatingEye, texture: 'floating-eye'}
  };

  scene: GameScene;
  pathFinder: PathFinder;
  enemies: Map<string, Phaser.Physics.Arcade.Group>;
  spawnedEnemies: number;
  spawnInterval: number;

  constructor(scene: GameScene) {
    this.pathFinder = new PathFinder(scene);
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
        this.spawnEnemy('floating-eye');
      } else {
        clearInterval(spawnInterval);
      }
    }, 1000);
  }
}
