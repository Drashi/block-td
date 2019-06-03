import "phaser";
import { PathFinder } from "./pathFinder";
import { EnemyManager } from "./enemies/enemyManager";
import { TowerManager } from "./towers/towerManager";
import { GamePanel } from "./ui/gamePanel/gamePanel";
import MapCoordinates from "./interfaces/mapCoordinates";

export class GameScene extends Phaser.Scene {
  mapContainer: Phaser.GameObjects.Container;
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  gamePanel: Phaser.GameObjects.Container;
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
    this.load.image('background', 'assets/background.jpg');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('spawn', 'assets/spawn.png');
    this.load.image('phaserguy', 'assets/phaserguy.png');
    this.load.image('tower-basic', 'assets/base.png');
    this.load.image('bullet-basic', 'assets/bullet-basic.png');
  }

  create(): void {
    const background = this.add.image(0, 0, 'background');
    background.setPosition(0 + background.width / 2, 0 + background.height / 2);

    this.initMap();
    this.initObjects();

    this.pathFinder = new PathFinder(this);
    this.enemyManager = new EnemyManager();
    this.towerManager = new TowerManager();
    this.gamePanel = new GamePanel(this, 640, 0);

    this.input.on('pointerdown', () => this.enemyManager.startWave(this), this);
  }

  initMap(): void {
    this.map = this.make.tilemap({ key: 'map'});
    this.tiles = this.map.addTilesetImage('tiles', 'tileset');
    this.map.createStaticLayer(0, this.tiles, 10, 10);
    this.map.createStaticLayer(1, this.tiles, 10, 10);
    this.map.createStaticLayer(2, this.tiles, 10, 10);
    this.map.createStaticLayer(3, this.tiles, 10, 10);
  }

  initObjects(): void {
    this.mapContainer = this.add.container(10, 10);
    this.spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'})[0];
    this.base = this.map.createFromObjects("Base", 40, {key: 'base'})[0];
    this.physics.add.existing(this.base);

    this.mapContainer.add([this.spawn, this.base]);
    this.add.existing(this.mapContainer);
    this.mapContainer.setDepth(1);
  }

  getTilePosition(x: number, y: number): MapCoordinates {
    return {
      x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
      y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight
    }
  }
}