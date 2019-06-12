import "phaser";
import { GameScene } from "../../scenes/gameScene";
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
      let button: BuildButton = new BuildButton(scene, 0, 0, tower.texture, tower.cost);
      this.add(button);
    }

    Phaser.Actions.GridAlign(this.getAll(), {
      width: columns,
      cellWidth: 32 + gapSize,
      cellHeight: 32 + gapSize,
      x: 0,
      y: 0
    });

    this.iterate((button: BuildButton) => button.setPosition(button.x + (button.width + gapSize) / 2, button.y + (button.height + gapSize) / 2));
  }

  updateButtons(): void {
    this.iterate((button: BuildButton) => button.updateButton());
  }
}
