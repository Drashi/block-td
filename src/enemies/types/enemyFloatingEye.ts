import "phaser";
import { GameScene } from "../../scenes/gameScene";
import { Enemy } from "../enemy";

export class EnemyFloatingEye extends Enemy {
  name: string = 'floating-eye';
  initialHealth: number = 100;
  initialSpeed: number = 10;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'floating-eye');
  }
}