import "phaser";
import * as EasyStar from "easystarjs";

export class GameScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  finder: EasyStar.js;
  spawnPosition: any;
  basePosition: any;
  enemy: Phaser.Physics.Arcade.Image;

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
  }

  create(): void {
    this.initMap();
    this.initObjects();
    this.initFinder();
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
    const spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'});
    const base = this.map.createFromObjects("Base", 40, {key: 'base'});
    this.spawnPosition = this.getTilePosition(spawn[0].x, spawn[0].y);
    this.basePosition = this.getTilePosition(base[0].x, base[0].y);
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

  getTileID(x: number, y: number) {
    const tile = this.map.getTileAt(x, y, true, "Path");
    return tile.index;
  }

  calculatePosition(x: number, y: number) {
    const toX = Math.floor(x / this.map.tileWidth);
    const toY = Math.floor(y / this.map.tileHeight);
    const fromX = Math.floor(this.enemy.x / this.map.tileWidth);
    const fromY = Math.floor(this.enemy.y / this.map.tileHeight);

    this.finder.findPath(fromX, fromY, toX, toY, (path) => {
      if (path !== null)
        this.moveCharacter(path);
    });

    this.finder.calculate();
  }

  getTilePosition(x: number, y: number) {
    return {x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
            y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight}
  }

  moveCharacter(path) {
    const tweens = [];

    for (let i = 0; i < path.length-1; i++) {
      const ex = path[i+1].x;
      const ey = path[i+1].y;

      tweens.push({
        targets: this.enemy,
        x: {value: ex * this.map.tileWidth, duration: 200},
        y: {value: ey * this.map.tileHeight, duration: 200}
      });
    }

    this.tweens.timeline({
      tweens: tweens
    });
  }
};