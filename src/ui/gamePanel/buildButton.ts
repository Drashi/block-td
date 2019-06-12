import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { GoldInfo } from "./goldInfo";

export class BuildButton extends Phaser.GameObjects.Container {
  scene: GameScene;
  cost: number;
  buildable: boolean;
  button: Phaser.GameObjects.Image;
  goldInfo: GoldInfo;

  constructor(scene: GameScene, x: number, y: number, type: string, cost: number) {
    super(scene, x, y);
    this.scene = scene;
    this.cost = cost;

    this.button = new Phaser.GameObjects.Image(scene, x, y, type);
    this.button.setInteractive();
    this.button.setOrigin(0);
    this.button.on('pointerdown', () => this.buildTower(scene, type), this);
  
    this.goldInfo = new GoldInfo(scene, 23 + this.button.width / 2, this.button.height + this.button.height / 2 + 15, cost);
    this.goldInfo.setScale(0.5);
    this.goldInfo.setPosition(this.goldInfo.x - this.goldInfo.getBounds().width / 2, this.button.height + this.button.height / 2 + 15);

    this.add([this.button, this.goldInfo]);
    scene.add.existing(this);
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
      this.button.setTint(0xff0000);
      this.goldInfo.text.setTint(0xff0000);
    } else {
      this.buildable = true;
      this.button.clearTint();
      this.goldInfo.text.clearTint();
    }
  }
}
