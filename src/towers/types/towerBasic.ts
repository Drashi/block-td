import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { Tower } from '../tower';
import MapCoordinates from '../../util/interfaces/mapCoordinates';

export class TowerBasic extends Tower {
  name: string = 'tower-basic';
  damage: number = 10;
  attackSpeed: number = 200;
  radiusSize: number = 200;
  bulletType: string = 'basic';

  constructor(scene: GameScene, position: MapCoordinates) {
    super(scene, position, 'tower-basic');
  }
}
