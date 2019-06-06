import "phaser";
import { CONFIG } from "./config";
import { MapManager } from "./mapManager";
import { PathFinder } from "./pathFinder";
import { EnemyManager } from "./enemies/enemyManager";
import { TowerManager } from "./towers/towerManager";
import { GamePanel } from "./ui/gamePanel/gamePanel";

export class GameScene extends Phaser.Scene {
  mapManager: MapManager;
  gamePanel: GamePanel;
  pathFinder: PathFinder;
  enemyManager: EnemyManager;
  towerManager: TowerManager;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image('background', 'assets/background.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('spawn', 'assets/spawn.png');
    this.load.image('phaserguy', 'assets/phaserguy.png');
    this.load.image('tower-basic', 'assets/base.png');
    this.load.image('bullet-basic', 'assets/bullet-basic.png');

    this.loadGamePanelAssets();
  }

  loadGamePanelAssets(): void {
    this.load.image('button-start-wave', 'assets/ui/game-panel/button-start-wave.png');
  }

  create(): void {
    const background = this.add.image(0, 0, 'background');
    background.setPosition(0 + background.width / 2, 0 + background.height / 2);

    this.mapManager = new MapManager(this);
    this.mapManager.setMap();

    this.gamePanel = new GamePanel(this, CONFIG.BORDER_SIZE + this.mapManager.map.widthInPixels, CONFIG.BORDER_SIZE);

    this.pathFinder = new PathFinder(this);
    this.enemyManager = new EnemyManager();
    this.towerManager = new TowerManager();
  }

  update(time: any, delta: any): void {
    this.mapManager.updateTiles();
  }
}