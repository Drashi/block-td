import { CONFIG } from "./config";
import { GameScene } from "./gameScene";
import MapCoordinates from "./interfaces/mapCoordinates";

export class MapManager {
  scene: GameScene;
  map: Phaser.Tilemaps.Tilemap;
  mapContainer: Phaser.GameObjects.Container;
  mapBounds: Phaser.Geom.Rectangle;
  tiles: Phaser.Tilemaps.Tileset;
  buildableTerrain: Phaser.Tilemaps.DynamicTilemapLayer;
  tileMarker: Phaser.GameObjects.Graphics;
  tileTint: Phaser.GameObjects.Rectangle;
  activeTile: Phaser.Tilemaps.Tile;
  spawn: Phaser.GameObjects.Sprite;
  base: Phaser.GameObjects.Sprite;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  setMap(): void {
    this.map = this.scene.make.tilemap({ key: 'map'});
    this.tiles = this.map.addTilesetImage('tiles', 'tileset');
    this.buildableTerrain = this.map.createDynamicLayer(0, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(1, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(2, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(3, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.setLayer(this.buildableTerrain);

    this.mapBounds = new Phaser.Geom.Rectangle(CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE, this.map.widthInPixels - 1, this.map.heightInPixels - 1);
    this.setMapObjects();
  }

  setMapObjects(): void {
    this.mapContainer = this.scene.add.container(CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'})[0];
    this.base = this.map.createFromObjects("Base", 40, {key: 'base'})[0];
    this.scene.physics.add.existing(this.base);

    this.tileMarker = this.scene.add.graphics();
    this.tileMarker.lineStyle(2, 0x000000, 1);
    this.tileMarker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    this.tileTint = this.scene.add.rectangle(0, 0, this.map.tileWidth, this.map.tileHeight, 0x00ff00, 0.5);
    this.tileTint.setActive(false);
    this.tileTint.setVisible(false);

    this.mapContainer.add([this.spawn, this.base, this.tileMarker, this.tileTint]);
    this.scene.add.existing(this.mapContainer);
    this.mapContainer.setDepth(1);
  }

  buildMode(active: boolean): void {
    this.tileTint.setActive(active);
    this.tileTint.setVisible(active);
  }

  updateTiles(): void {
    this.tileMarker.clear();

    const x = Phaser.Math.Clamp(this.scene.input.activePointer.x, this.mapBounds.left, this.mapBounds.right);
    const y = Phaser.Math.Clamp(this.scene.input.activePointer.y, this.mapBounds.top, this.mapBounds.bottom);

    const pointerTileX = this.map.worldToTileX(x);
    const pointerTileY = this.map.worldToTileY(y);

    const tileX = this.map.tileToWorldX(pointerTileX) - this.mapContainer.x;
    const tileY = this.map.tileToWorldY(pointerTileY) - this.mapContainer.y;

    const hasTile = this.map.hasTileAtWorldXY(x, y);

    if (hasTile && this.scene.input.manager.activePointer.isDown && this.mapBounds.contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y)) {
      this.activeTile = this.map.getTileAt(pointerTileX, pointerTileY);
      this.tileTint.setPosition(tileX + this.tileTint.width / 2, tileY + this.tileTint.height / 2);
      this.buildMode(true);
    } else if (this.mapBounds.contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y)) {
      this.tileMarker.lineStyle(2, (hasTile ? 0x00ff00 : 0xff0000), 1);
      this.tileMarker.strokeRect(tileX, tileY, this.map.tileWidth, this.map.tileHeight);
    } else if (this.scene.input.manager.activePointer.isDown) {
      this.buildMode(false);
    }
  }


  getTilePosition(x: number, y: number): MapCoordinates {
    return {
      x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
      y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight
    }
  }
}