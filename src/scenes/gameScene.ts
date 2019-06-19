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
  wave: number;
  waveActive: boolean;
  ending: boolean;

  constructor() {
    super({
      key: "GameScene"
    });

    store.subscribe(() => {
      if (this.scene.isPaused() && !store.getState().gameOver) {
        this.scene.restart();
      }
    });
  }

  create(): void {
    this.input.manager.enabled = true;
    this.ending = false;
    this.health = CONFIG.STARTING_HEALTH;
    this.gold = CONFIG.STARTING_GOLD;
    this.wave = 0;
    this.waveActive = false;

    const background = this.add.image(0, 0, 'background-game');
    background.setPosition(0 + background.width / 2, 0 + background.height / 2);
    background.setDepth(2);

    this.mapManager = new MapManager(this);
    this.mapManager.setMap();

    this.enemyManager = new EnemyManager(this);
    this.towerManager = new TowerManager();

    this.gamePanel = new GamePanel(this, CONFIG.BORDER_SIZE * 2 + this.mapManager.map.widthInPixels, CONFIG.BORDER_SIZE);
  }

  update(time: any, delta: any): void {
    this.mapManager.updateTiles();
    this.gamePanel.updatePanel();

    if (this.waveActive)
      this.enemyManager.updateWave();

    if (this.health <= 0 && !this.ending) {
      this.ending = true;
      this.input.manager.enabled = false;
      this.mapManager.base.onExplosion();
      this.time.addEvent({
        delay: 1000,
        callback: () => this.endGame(),
      });
    } else if (this.enemyManager.noWavesLeft()) {
      this.endGame();
    }
  }

  endGame(): void {
    this.scene.pause();
    store.dispatch({ type: 'GAME_OVER'});
  }
}