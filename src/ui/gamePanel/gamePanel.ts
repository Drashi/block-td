import "phaser";
import { CONFIG } from "../../config";
import { GameScene } from "../../scenes/gameScene";
import { StartWaveButton } from "./startWaveButton";
import { BuildButtonsContainer } from "./buildButtonsContainer";
import { GoldInfo } from "./goldInfo";

export class GamePanel extends Phaser.GameObjects.Container {
  scene: GameScene;
  startWaveButton: StartWaveButton;
  buildButtonsContainer: BuildButtonsContainer;
  goldInfo: GoldInfo;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.setDepth(1);
    this.scene = scene;
    scene.add.existing(this);

    this.startWaveButton = new StartWaveButton(scene, CONFIG.GAME_PANEL_WIDTH / 2, 14);
    this.buildButtonsContainer = new BuildButtonsContainer(scene, 14, 80, 3, 13);
    this.goldInfo = new GoldInfo(scene, 40, CONFIG.GAME_PANEL_HEIGHT - 32, this.scene.gold);

    this.add([this.startWaveButton, this.buildButtonsContainer, this.goldInfo]);
  }

  setBuildMode(active: boolean): void {
    if (active && this.scene.towerManager.towerToBePlaced && !this.scene.towerManager.towerToBePlaced.placed) {
      this.scene.towerManager.towerToBePlaced.setActive(false);
      this.scene.towerManager.towerToBePlaced.setVisible(false);
      this.scene.towerManager.towerToBePlaced.radius.setActive(false);
      this.scene.towerManager.towerToBePlaced.radius.setVisible(false);
    }

    this.buildButtonsContainer.setActive(active);
    this.buildButtonsContainer.setVisible(active);
  }

  updatePanel(): void {
    this.goldInfo.updateCounterValue(this.scene.gold);
    this.buildButtonsContainer.updateButtons();
  }
}
