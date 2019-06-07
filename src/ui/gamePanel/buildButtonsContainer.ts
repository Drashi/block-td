import "phaser";
import { GameScene } from "../../gameScene";
import { BuildButton } from "./BuildButton";

export class BuildButtonsContainer extends Phaser.GameObjects.Container {
  constructor(scene: GameScene, x: number, y: number, columns: number, gapSize: number) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setButtons(scene, columns, gapSize);
    this.setActive(false);
    this.setVisible(false);
  }

  setButtons(scene: GameScene, columns: number, gapSize: number): void {
    for (let tower of scene.towerManager.towerTypes.values()) {
      let currentIndex: number = this.length + 1;
      let button: BuildButton = new BuildButton(scene, 0, 0, tower.texture);
      let firstInRow: boolean = currentIndex % columns === 1;
      let firstRow: boolean = Math.floor(currentIndex / columns) === 0;
      let buttonX: number = (button.width + (!firstInRow ? gapSize : 0)) * (this.length % columns);
      let buttonY: number = (button.height + (!firstRow ? gapSize : 0)) * Math.floor(this.length / columns);

      button.setPosition(buttonX + button.width / 2, buttonY + button.height / 2);
      this.add(button);
    }
  }
}
