import { CONFIG } from "./config";
import { GameScene } from "./gameScene";
import { Tower } from "./towers/tower";
import MapCoordinates from "./interfaces/mapCoordinates";

export class MapManager {
  scene: GameScene;
  map: Phaser.Tilemaps.Tilemap;
  mapContainer: Phaser.GameObjects.Container;
  mapBounds: Phaser.GameObjects.Rectangle;
  tiles: Phaser.Tilemaps.Tileset;
  buildableTerrain: Phaser.Tilemaps.DynamicTilemapLayer;
  tileMarker: Phaser.GameObjects.Graphics;
  tileTint: Phaser.GameObjects.Rectangle;
  activeTile: Phaser.Tilemaps.Tile;
  spawn: Phaser.GameObjects.Sprite;
  base: Phaser.GameObjects.Sprite;
  spawnPosition: MapCoordinates;
  basePosition: MapCoordinates;
  occupiedTiles: Phaser.Tilemaps.Tile[];

  constructor(scene: GameScene) {
    this.scene = scene;
    this.occupiedTiles = [];
  }

  setMap(): void {
    this.map = this.scene.make.tilemap({ key: 'map'});
    this.tiles = this.map.addTilesetImage('tiles', 'tileset');
    this.buildableTerrain = this.map.createDynamicLayer(0, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(1, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(2, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.createStaticLayer(3, this.tiles, CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.map.setLayer(this.buildableTerrain);

    this.setMapObjects();
  }

  setMapObjects(): void {
    this.mapContainer = this.scene.add.container(CONFIG.BORDER_SIZE, CONFIG.BORDER_SIZE);
    this.mapBounds = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.map.widthInPixels - 1, this.map.heightInPixels - 1);
    this.mapBounds.setPosition(this.mapBounds.x + this.mapBounds.width / 2, this.mapBounds.y + this.mapBounds.height / 2);

    this.spawn = this.map.createFromObjects("Spawn", 50, {key: 'spawn'})[0];
    this.base = this.map.createFromObjects("Base", 40, {key: 'base'})[0];
    this.scene.physics.add.existing(this.base);

    this.spawnPosition = this.getTilePosition(this.spawn.x, this.spawn.y);
    this.basePosition = this.getTilePosition(this.base.x, this.base.y);

    this.tileMarker = this.scene.add.graphics();
    this.tileMarker.lineStyle(2, 0x000000, 1);
    this.tileMarker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    this.tileTint = this.scene.add.rectangle(0, 0, this.map.tileWidth, this.map.tileHeight, 0x00ff00, 0.5);
    this.tileTint.setActive(false);
    this.tileTint.setVisible(false);

    this.mapContainer.add([this.mapBounds, this.spawn, this.base, this.tileMarker, this.tileTint]);
    this.scene.add.existing(this.mapContainer);
    this.mapContainer.setDepth(0);
  }

  buildMode(active: boolean): void {
    this.tileTint.setActive(active);
    this.tileTint.setVisible(active);
    this.scene.gamePanel.setBuildMode(active);
  }

  updateTiles(): void {
    this.tileMarker.clear();
    
    const x = Phaser.Math.Clamp(this.scene.input.activePointer.x, this.mapBounds.getBounds().left, this.mapBounds.getBounds().right);
    const y = Phaser.Math.Clamp(this.scene.input.activePointer.y, this.mapBounds.getBounds().top, this.mapBounds.getBounds().bottom);

    const pointerTileX = this.map.worldToTileX(x);
    const pointerTileY = this.map.worldToTileY(y);

    const tileX = this.map.tileToWorldX(pointerTileX) - this.mapContainer.x;
    const tileY = this.map.tileToWorldY(pointerTileY) - this.mapContainer.y;

    const isTileOccupied = !(this.map.hasTileAtWorldXY(x, y) && !this.occupiedTiles.includes(this.map.getTileAt(pointerTileX, pointerTileY)));

    if (!isTileOccupied && this.scene.input.manager.activePointer.isDown && this.mapBounds.getBounds().contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y)) {
      const activeTile = this.map.getTileAt(pointerTileX, pointerTileY);
      this.activeTile = activeTile;
      this.tileTint.setPosition(tileX + this.tileTint.width / 2, tileY + this.tileTint.height / 2);
      this.buildMode(true);
    } else if (this.mapBounds.getBounds().contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y)) {
      this.tileMarker.lineStyle(2, (!isTileOccupied ? 0x00ff00 : 0xff0000), 1);
      this.tileMarker.strokeRect(tileX, tileY, this.map.tileWidth, this.map.tileHeight);
    }
  }

  occupyTile(tower: Tower, tile: any): void {
    if (tower.placed && !this.occupiedTiles.includes(tile))
      this.occupiedTiles.push(tile);
  }

  getTilePosition(x: number, y: number): MapCoordinates {
    return {
      x: Math.floor(x / this.map.tileWidth) * this.map.tileWidth,
      y: Math.floor(y / this.map.tileHeight) * this.map.tileHeight
    }
  }
}