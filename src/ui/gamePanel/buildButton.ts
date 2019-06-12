import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class BuildButton extends Phaser.GameObjects.Image {
  scene: GameScene;
  cost: number;
  buildable: boolean;

  constructor(scene: GameScene, x: number, y: number, type: string, cost: number) {
    super(scene, x, y, type);
    scene.add.existing(this);
    this.scene = scene;
    this.cost = cost;
    this.setInteractive();
    this.on('pointerdown', () => this.buildTower(scene, type), this);
  }

  buildTower(scene: GameScene, type: string): void {
    if (this.buildable) {
      const tileX = scene.mapManager.map.tileToWorldX(scene.mapManager.activeTile.x) - scene.mapManager.mapContainer.x;
      const tileY = scene.mapManager.map.tileToWorldY(scene.mapManager.activeTile.y) - scene.mapManager.mapContainer.y;
      scene.towerManager.build(scene, {x: tileX, y: tileY}, type);
    }
  }

  updateButton() {
    if (this.scene.gold < this.cost) {
      this.buildable = false;
      this.setTint(0xff0000);
    } else {
      this.buildable = true;
      this.clearTint();
    }
  }
}
