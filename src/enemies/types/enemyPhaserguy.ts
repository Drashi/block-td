import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { Enemy } from "../enemy";

export class EnemyPhaserguy extends Enemy {
  name: string = 'phaserguy';
  initialHealth: number = 100;
  initialSpeed: number = 10;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'phaserguy');
  }
}