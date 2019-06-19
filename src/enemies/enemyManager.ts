import "phaser";
import { GameScene } from "../scenes/gameScene";
import { PathFinder } from "./pathFinder";
import { Enemy } from "./enemy";
import { EnemyFloatingEye } from "./types/enemyFloatingEye";
import Wave from "../util/interfaces/wave";

export class EnemyManager {
  enemyTypes: {} = {
    'floating-eye': {class: EnemyFloatingEye, texture: 'floating-eye'}
  };

  scene: GameScene;
  waves: {number: Wave};
  currentWave: Wave[];
  waveProgress: number;
  spawnInterval: Phaser.Time.TimerEvent;
  pathFinder: PathFinder;
  enemies: Map<string, Phaser.Physics.Arcade.Group>;

  constructor(scene: GameScene) {
    this.waves = scene.cache.json.get('waves');
    this.pathFinder = new PathFinder(scene);
    this.enemies = new Map();
    this.scene = scene;
  }

  spawnEnemy(enemyType: string): void {
    let enemy: Enemy;
  
    if (this.enemies.has(enemyType))  {
      enemy = this.enemies.get(enemyType).get();
    } else {
      const group = this.scene.physics.add.group({ classType: this.enemyTypes[enemyType].class as any, defaultKey: this.enemyTypes[enemyType].texture, runChildUpdate: true });
      this.enemies.set(enemyType, group);
      enemy = this.enemies.get(enemyType).get();
    }

    this.scene.mapManager.mapContainer.add(enemy);
    enemy.set();
    this.scene.mapManager.spawn.onSpawn();
  }

  startWave(): void {
    this.currentWave = this.waves[this.scene.wave + 1];

    if (this.currentWave) {
      this.scene.waveActive = true;
      this.scene.wave++;
      this.waveProgress = 0;
      this.scene.mapManager.spawn.setActivity(true);
  
      this.spawnInterval = this.scene.time.addEvent({
        delay: this.currentWave[this.waveProgress].delay,
        repeat: this.currentWave[this.waveProgress].count,
        callback: () => this.spawnEnemy(this.currentWave[this.waveProgress].enemy),
        callbackScope: this
      });
    }
  }

  updateWave(): void {
    if (this.spawnInterval.getOverallProgress() == 1 && this.currentWave[this.waveProgress + 1]) {
      this.waveProgress++;
      this.spawnInterval = this.scene.time.addEvent({
        delay: this.currentWave[this.waveProgress].delay,
        repeat: this.currentWave[this.waveProgress].count,
        callback: () => this.spawnEnemy(this.currentWave[this.waveProgress].enemy),
        callbackScope: this
      });
    } else if (this.spawnInterval.getOverallProgress() == 1 && !this.currentWave[this.waveProgress + 1] && this.getActiveEnemiesCount() == 0) {
      this.waveProgress = 0;
      this.scene.waveActive = false;
      this.scene.mapManager.spawn.setActivity(false);
    }
  }

  noWavesLeft(): boolean {
    return (!this.scene.waveActive && !this.waves[this.scene.wave + 1]);
  }

  getActiveEnemiesCount(): number {
    let count: number = 0;

    for (let enemies of this.scene.enemyManager.enemies.values()) {
      count += enemies.countActive();
    }

    return count;
  }
}
