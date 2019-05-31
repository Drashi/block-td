import "phaser";
import { PathFinder } from "./pathFinder";
import { EnemyManager } from "./enemies/enemyManager";
import { TowerManager } from "./towers/towerManager";
import MapCoordinates from "./interfaces/mapCoordinates";

export class GameScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  pathFinder: PathFinder;
  enemyManager: EnemyManager;
  towerManager: TowerManager;
  spawn: Phaser.GameObjects.Sprite;
  base: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('spawn', 'assets/spawn.png');
    this.load.image('phaserguy', 'assets/phaserguy.png');
    this.load.image('tower_basic', 'assets/base.png');
    this.load.image('bullet_basic', 'assets/bullet_basic.png');
  }

  create(): void {
    this.initMap();
    this.initObjects();
    this.pathFinder = new PathFinder(this);
    this.enemyManager = new EnemyManager();
    this.towerManager = new TowerManager();
 
    this.input.on('pointerdown', () => this.enemyManager.startWave(this), this);
  }

  initMap(): void {
    this.map = this.make.tilemap({ key: 'map'});
    this.tiles = this.map.addTilesetImage('tiles', 'tileset');
    this.map.createStaticLayer(0, this.tiles, 0,0);
    this.map.createStaticLayer(1, this.tiles, 0,0);
    this.map.createStaticLayer(2, this.tiles, 0,0);
    this.map.createStaticLayer(3, this.tiles, 0,0);
  }

  initObjects(): void {
    this.spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'})[0];
    this.base = this.map.createFromObjects("Base", 40, {key: 'base'})[0];
    this.physics.add.existing(this.base);
  }

  getTilePosition(x: number, y: number): MapCoordinates {
    return {
      x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
      y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight
    }
  }
}