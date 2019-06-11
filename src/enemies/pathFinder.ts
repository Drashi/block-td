import * as EasyStar from "easystarjs";
import { GameScene } from "../scenes/gameScene";
import MapCoordinates from '../util/interfaces/mapCoordinates';

export class PathFinder extends EasyStar.js {
  scene: GameScene;

  constructor(scene: GameScene) {
    super();
    this.scene = scene;
    this.init();
  }

  init(): void {
    const grid = [];

    for(let y = 0; y < this.scene.mapManager.map.height; y++) {
      let col = [];
      for(let x = 0; x < this.scene.mapManager.map.width; x++) {
        col.push(this.getTileID(x, y));
      }
      grid.push(col);
    }
    this.setGrid(grid);

    const tileset = this.scene.mapManager.map.tilesets[0];
    const properties = tileset.tileProperties;
    const acceptableTiles = [];

    for(let i = tileset.firstgid - 1; i < this.scene.mapManager.tiles.total; i++) {
      if (!properties.hasOwnProperty(i)) {
        acceptableTiles.push(i+1);
        continue;
      }
      if (!properties[i].collide)
        acceptableTiles.push(i + 1);
    }

    this.setAcceptableTiles(acceptableTiles);
  }

  calculatePosition(from: MapCoordinates, to: MapCoordinates, callback: (...any) => any): void {
    const fromX = Math.floor(from.x / this.scene.mapManager.map.tileWidth);
    const fromY = Math.floor(from.y / this.scene.mapManager.map.tileHeight);
    const toX = Math.floor(to.x / this.scene.mapManager.map.tileWidth);
    const toY = Math.floor(to.y / this.scene.mapManager.map.tileHeight);

    this.findPath(fromX, fromY, toX, toY, (path) => {
      if (path !== null)
        callback(path);
    });

    this.calculate();
  }
  
  private getTileID(x: number, y: number): number {
    const tile = this.scene.mapManager.map.getTileAt(x, y, true, "Path");
    return tile.index;
  }
}