import "phaser";
import { GameScene } from "../../scenes/gameScene";

export class BuildButton extends Phaser.GameObjects.Image {
  constructor(scene: GameScene, x: number, y: number, type: string) {
    super(scene, x, y, type);
    scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', () => this.buildTower(scene, type), this);
  }

  buildTower(scene: GameScene, type: string): void {
    const tileX = scene.mapManager.map.tileToWorldX(scene.mapManager.activeTile.x) - scene.mapManager.mapContainer.x;
    const tileY = scene.mapManager.map.tileToWorldY(scene.mapManager.activeTile.y) - scene.mapManager.mapContainer.y;

    scene.towerManager.build(scene, {x: tileX, y: tileY}, type);
  }
}
