import "phaser";
import { CONFIG } from "../../config";
import { GameScene } from "../../gameScene";
import { StartWaveButton } from "./startWaveButton";
import { BuildButtonsContainer } from "./buildButtonsContainer";

export class GamePanel extends Phaser.GameObjects.Container {
  scene: GameScene;
  startWaveButton: StartWaveButton;
  buildButtonsContainer: BuildButtonsContainer;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y);
    this.setDepth(1);
    this.scene = scene;
    scene.add.existing(this);

    this.startWaveButton = new StartWaveButton(scene, CONFIG.GAME_PANEL_WIDTH / 2, 14);
    this.buildButtonsContainer = new BuildButtonsContainer(scene, 14, 80, 3, 13);

    this.add([this.startWaveButton, this.buildButtonsContainer]);
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
}
