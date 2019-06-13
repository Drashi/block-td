import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { IconCounter } from "./iconCounter";

export class GoldInfo extends IconCounter {
  constructor(scene: GameScene, x: number, y: number, initialValue: number) {
    super(scene, x, y, initialValue, 'icon-gold');
  }

  updateGoldCounter(value: number) {
    this.updateCounterValue(value);
    this.updateTextSize();
  }

  updateTextSize(): void {
    if (this.counter > 999 && this.text.style.fontSize !== '18px')
      this.text.setFontSize(18);
    else if (this.counter < 1000 && this.text.style.fontSize !== '20px')
      this.text.setFontSize(20);
  }
}
