import "phaser";
import { GameScene } from "../scenes/gameScene";
import { Tower } from "./tower";
import { TowerBasic } from "./types/towerBasic";
import MapCoordinates from "../util/interfaces/mapCoordinates";

export class TowerManager {
  towerTypes: Map<string, any>;
  towers: Map<string, Phaser.Physics.Arcade.Group>;
  towerToBePlaced: Tower;

  constructor() {
    this.setTowerTypes();
    this.towers = new Map();
  }

  setTowerTypes(): void {
    this.towerTypes = new Map();
    this.towerTypes.set('tower-basic', {class: TowerBasic, texture: 'tower-basic'});
  }

  build(scene: GameScene, position: MapCoordinates, towerType: string): void {
    if (this.towerToBePlaced && this.towerToBePlaced.active && !this.towerToBePlaced.placed) {
      this.towerToBePlaced.place();
      scene.gamePanel.setBuildMode(false);
      return;
    }
  
    if (this.towers.has(towerType))  {
      this.towerToBePlaced = this.towers.get(towerType).get();
    } else {
      const group = scene.physics.add.group({ classType: this.towerTypes.get(towerType).class as any, defaultKey: this.towerTypes.get(towerType).texture, runChildUpdate: true });
      scene.physics.add.overlap(group, scene.mapManager.buildableTerrain, scene.mapManager.occupyTile, null, scene.mapManager);

      this.towers.set(towerType, group);
      this.towerToBePlaced = this.towers.get(towerType).get();
    }

    scene.mapManager.mapContainer.add(this.towerToBePlaced);
    this.towerToBePlaced.setActive(true);
    this.towerToBePlaced.setVisible(true);
    this.towerToBePlaced.prepare(position);
  }
}
