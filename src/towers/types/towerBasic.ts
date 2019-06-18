import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { Tower } from '../tower';
import MapCoordinates from '../../util/interfaces/mapCoordinates';

export class TowerBasic extends Tower {
  name: string = 'tower-basic';
  damage: number = 20;
  cost: number = 50;
  attackSpeed: number = 250;
  radiusSize: number = 200;
  bulletType: string = 'basic';
  sound: string = 'tower-basic';

  constructor(scene: GameScene, position: MapCoordinates) {
    super(scene, position, 'tower-basic');
  }
}
