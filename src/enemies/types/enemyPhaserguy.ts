import "phaser";
import { GameScene } from "../../gameScene";
import { Enemy } from "../enemy";

export class EnemyPhaserguy extends Enemy {
  name: string = 'phaserguy';
  health: number = 100;
  speed: number = 10;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'phaserguy');
  }
}