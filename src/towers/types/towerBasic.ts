import "phaser";
import { Tower } from '../tower';
import MapCoordinates from '../../interfaces/mapCoordinates';

export class TowerBasic extends Tower {
  name: string = 'tower_basic';
  damage: number = 10;
  attackSpeed: number = 200;
  radiusSize: number = 200;
  bulletType: string = 'basic';

  constructor(scene: Phaser.Scene, position: MapCoordinates) {
    super(scene, position, 'tower_basic');
    this.setRadius();
    this.setBullets();
  }
}
