import "phaser";
import { TowerFactory } from "./towerFactory";
import { Tower } from "./tower";
import { Bullet } from "./bullets/bullet";
import { Enemy } from "../enemies/enemy";
import { EnemyManager } from "../enemies/enemyManager";
import MapCoordinates from "../interfaces/mapCoordinates";

export class TowerManager {
  towers: Tower[];
  towerFactory: TowerFactory;

  constructor() {
    this.towers = [];
    this.towerFactory = new TowerFactory();
  }

  build(scene: Phaser.Scene, position: MapCoordinates, type: string) {
    let tower: Tower = this.towerFactory.getInstance<Tower>(type, scene, position);
    this.towers.push(tower);
  }

  enemyInRangeDetection(scene, enemyManager: EnemyManager): void {
    for (let t = 0; t < this.towers.length; t++) {
      for (let e = 0; e < enemyManager.enemies.length; e++) {
        if (this.towers[t].isAttacking() && !this.towers[t].isTargetInRadius())
          this.towers[t].stopAttacking();

        scene.physics.overlap(enemyManager.enemies[e], this.towers[t].getRadius(), this.onTowerRadiusReached(this.towers[t], enemyManager.enemies[e]), null, this);
        scene.physics.overlap(enemyManager.enemies[e], this.towers[t].getBullets(), this.onEnemyHit, null, this);
      }
    }
  }

  onTowerRadiusReached(tower: Tower, target: Enemy): () => void {
    return function () {
      if (!tower.isAttacking())
        tower.attack(target)
    }
  }

  onEnemyHit(enemy: Enemy, bullet: Bullet): void {
    if (bullet.active) {
      enemy.onHit(bullet.damage);
      bullet.setActive(false);
      bullet.setVisible(false);
    }
  }
}
