import "phaser";
import { Enemy } from "../enemy";
import MapCoordinates from '../../interfaces/mapCoordinates';

export class Phaserguy extends Enemy {
  name: string = 'phaserguy';
  health: number = 100;
  speed: number = 10;

  constructor(scene: Phaser.Scene, spawnPosition: MapCoordinates) {
    super(scene, spawnPosition, 'phaserguy');
  }
}