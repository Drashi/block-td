import "phaser";
import { CONFIG } from "../../config";
import { GameScene } from "../../scenes/gameScene";
import { StartWaveButton } from "./startWaveButton";
import { BuildButtonsContainer } from "./buildButtonsContainer";
import { GoldCounter } from "./goldCounter";

export class GamePanel extends Phaser.GameObjects.Container {
  scene: GameScene;
  startWaveButton: StartWaveButton;
  buildButtonsContainer: BuildButtonsContainer;
  goldCounter: GoldCounter;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.setDepth(1);
    this.scene = scene;
    scene.add.existing(this);

    this.startWaveButton = new StartWaveButton(scene, CONFIG.GAME_PANEL_WIDTH / 2, 14);
    this.buildButtonsContainer = new BuildButtonsContainer(scene, 14, 80, 3, 13);
    this.goldCounter = new GoldCounter(scene, 40, CONFIG.GAME_PANEL_HEIGHT - 32);

    this.add([this.startWaveButton, this.buildButtonsContainer, this.goldCounter]);
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
    this.goldCounter.updateCounter();
    this.buildButtonsContainer.updateButtons();
  }
}
