import "phaser";
import store from '../store';
import { CONFIG } from "../config";
import { MapManager } from "../map/mapManager";
import { EnemyManager } from "../enemies/enemyManager";
import { TowerManager } from "../towers/towerManager";
import { GamePanel } from "../ui/gamePanel/gamePanel";

export class GameScene extends Phaser.Scene {
  mapManager: MapManager;
  gamePanel: GamePanel;
  enemyManager: EnemyManager;
  towerManager: TowerManager;
  health: number;
  gold: number;

  constructor() {
    super({
      key: "GameScene"
    });

    store.subscribe(() => {
      if (store.getState().gameStarted && !store.getState().gameOver)
        this.scene.restart();
    });
  }

  preload(): void {
    this.load.image('background', 'assets/background.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('spawn', 'assets/spawn.png');
    this.load.image('floating-eye', 'assets/enemies/floating-eye.png');
    this.load.image('tower-basic', 'assets/towers/tower-basic.png');
    this.load.image('bullet-basic', 'assets/bullets/bullet-basic.png');
    this.load.image('particle-blue', 'assets/particles/particle-blue.png');

    this.loadGamePanelAssets();
  }

  loadGamePanelAssets(): void {
    this.load.image('button-start-wave', 'assets/ui/game-panel/button-start-wave.png');
    this.load.image('icon-health', 'assets/ui/game-panel/icon-health.png');
    this.load.image('icon-gold', 'assets/ui/game-panel/icon-gold.png');
  }

  create(): void {
    this.health = CONFIG.STARTING_HEALTH;
    this.gold = CONFIG.STARTING_GOLD;

    const background = this.add.image(0, 0, 'background');
    background.setPosition(0 + background.width / 2, 0 + background.height / 2);
    background.setDepth(1);

    this.mapManager = new MapManager(this);
    this.mapManager.setMap();

    this.enemyManager = new EnemyManager(this);
    this.towerManager = new TowerManager();

    this.gamePanel = new GamePanel(this, CONFIG.BORDER_SIZE * 2 + this.mapManager.map.widthInPixels, CONFIG.BORDER_SIZE);
  }

  update(time: any, delta: any): void {
    this.mapManager.updateTiles();
    this.gamePanel.updatePanel();

    if (this.health <= 0) {
      this.scene.pause();
      store.dispatch({ type: 'GAME_OVER'});
    }
  }
}