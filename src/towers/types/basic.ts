import "phaser";
import { Tower } from '../tower';
import MapCoordinates from '../../interfaces/mapCoordinates';

export class Basic extends Tower {
  name: string = 'basic';
  damage: number = 10;
  radiusSize: number = 50;

  constructor(scene: Phaser.Scene, position: MapCoordinates) {
    super(scene, position, 'basic');
  }
}
