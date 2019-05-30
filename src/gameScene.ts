import "phaser";
import * as EasyStar from "easystarjs";
import { EnemyManager } from "./enemies/enemyManager";
import { TowerManager } from "./towers/towerManager";
import { Tower } from "./towers/tower";
import MapCoordinates from "./interfaces/mapCoordinates";

export class GameScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  finder: EasyStar.js;
  spawn: Phaser.GameObjects.Sprite[];
  spawnPosition: MapCoordinates;
  base: Phaser.GameObjects.Sprite[];
  basePosition: MapCoordinates;
  enemyManager: EnemyManager;
  towerManager: TowerManager;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
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
    this.initFinder();
    this.enemyManager = new EnemyManager();
    this.towerManager = new TowerManager();
  
    this.input.on('pointerdown', () => this.enemyManager.startWave(this, this.spawnPosition, this.basePosition, this.finder), this);
  }

  update(): void {
    this.enemyManager.baseCollisionDetection(this, this.base);
    this.towerManager.enemyInRangeDetection(this, this.enemyManager);
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
    this.spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'});
    this.base = this.map.createFromObjects("Base", 40, {key: 'base'});
    this.physics.add.existing(this.base[0]);
  
    this.spawnPosition = this.getTilePosition(this.spawn[0].x, this.spawn[0].y);
    this.basePosition = this.getTilePosition(this.base[0].x, this.base[0].y);
  }

  initFinder(): void {
    this.finder = new EasyStar.js();
    const grid = [];

    for(let y = 0; y < this.map.height; y++) {
      let col = [];
      for(let x = 0; x < this.map.width; x++) {
        col.push(this.getTileID(x, y));
      }
      grid.push(col);
    }
    this.finder.setGrid(grid);

    const tileset = this.map.tilesets[0];
    const properties = tileset.tileProperties;
    const acceptableTiles = [];

    for(let i = tileset.firstgid - 1; i < this.tiles.total; i++) {
      if (!properties.hasOwnProperty(i)) {
        acceptableTiles.push(i+1);
        continue;
      }
      if (!properties[i].collide)
        acceptableTiles.push(i + 1);
    }

    this.finder.setAcceptableTiles(acceptableTiles);
  }

  private getTileID(x: number, y: number) {
    const tile = this.map.getTileAt(x, y, true, "Path");
    return tile.index;
  }

  private getTilePosition(x: number, y: number) {
    return {x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
            y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight}
  }
}