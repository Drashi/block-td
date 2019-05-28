import "phaser";
import { Tower } from "./tower";
import { Enemy } from "../enemies/enemy";
import { EnemyManager } from "../enemies/enemyManager";

export class TowerManager {
  towers: Tower[];

  constructor() {
    this.towers = [];
  }

  enemyInRangeDetection(scene, enemyManager: EnemyManager): void {
    for (let t = 0; t < this.towers.length; t++) {
      for (let e = 0; e < enemyManager.enemies.length; e++) {
        if (this.towers[t].isAttacking() && !this.towers[t].isTargetInRadius())
          this.towers[t].stopAttacking();

        scene.physics.overlap(enemyManager.enemies[e], this.towers[t].getRadius(), this.onTowerRadiusReached(this.towers[t], enemyManager.enemies[e]), null, this);
      }
    }
  }

  onTowerRadiusReached(tower: Tower, target: Enemy): () => void {
    return function () {
      if (!tower.isAttacking())
        tower.attack(target)
    }
  }
}
