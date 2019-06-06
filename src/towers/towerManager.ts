import "phaser";
import { GameScene } from "../gameScene";
import { TowerBasic } from "./types/towerBasic";
import MapCoordinates from "../interfaces/mapCoordinates";

export class TowerManager {
  towerTypes: {} = {
    'basic': {class: TowerBasic, texture: 'tower-basic'}
  };
  towers: Map<string, Phaser.Physics.Arcade.Group>;

  constructor() {
    this.towers = new Map();
  }

  build(scene: GameScene, position: MapCoordinates, towerType: string): void {
    let tower;
  
    if (this.towers.has(towerType))  {
      tower = this.towers.get(towerType).get();
    } else {
      this.towers.set(towerType, scene.physics.add.group({ classType: this.towerTypes[towerType].class as any, defaultKey: this.towerTypes[towerType].texture, runChildUpdate: true }));
      tower = this.towers.get(towerType).get();
    }

    scene.mapManager.mapContainer.add(tower);
    tower.setActive(true);
    tower.setVisible(true);
    tower.set(position);
  }
}
