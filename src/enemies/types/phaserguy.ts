import "phaser";
import { Enemy } from "../enemy";
import MapCoordinates from '../../interfaces/mapCoordinates';

export class Phaserguy extends Enemy {
  health = 100;
  speed = 10;

  constructor(scene: Phaser.Scene, spawnPosition: MapCoordinates) {
    super(scene, spawnPosition, 'phaserguy');
  }
}