import "phaser";
import { CONFIG } from "../config";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload() {
    this.setLoadScreen();
    this.loadAssets();
  }

  setLoadScreen(): void {
    const camera = this.cameras.add(0, 0, CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);
    camera.setBackgroundColor('#000000');

    const progressText = this.progressText();
    const progressBox = this.progressBox();
    const progressBar = this.progressBar();

    this.load.on('progress', (percentage) => {
      progressBar.fillRect(
        (CONFIG.GAME_WIDTH / 2) - 240,
        (CONFIG.GAME_HEIGHT / 2) - 15,
        500 * percentage, 30,
      );

      progressText.setText(Math.ceil(percentage * 100) + '%');
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      progressText.destroy();
    });
  }

  progressText() {
    const progressText = this.add.text(
      CONFIG.GAME_WIDTH / 2,
      (CONFIG.GAME_HEIGHT / 2),
      '0%',
      {
        fontFamily: 'arial',
        fontSize: 18,
        fill: '#E6E6E6',
      },
    );
    progressText.setOrigin(0.5, 0.5);
    progressText.setDepth(1);

    return progressText;
  }

  progressBox() {     
    const progressBox = this.add.graphics();
    progressBox.clear();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      (CONFIG.GAME_WIDTH / 2) - 250,
      (CONFIG.GAME_HEIGHT / 2) - 25,
      520, 50
    );

    return progressBox;
  }

  progressBar() {     
    const progressBar = this.add.graphics();
    progressBar.clear();

    return progressBar;
  }

  loadAssets(): void {
    this.loadUIAssets();
    this.loadMapAssets();
    this.loadEnemyAssets();
    this.loadTowerAssets();
    this.loadBulletAssets();
    this.loadParticleAssets();
    this.loadGamePanelAssets();
  }

  loadUIAssets(): void {
    const uiAssetsPath = 'assets/ui/';

    this.load.image('background-menu',  uiAssetsPath + 'background-menu.png');
    this.load.image('background-game',  uiAssetsPath + 'background-game.png');
  }

  loadMapAssets(): void {
    const mapAssetsPath = 'assets/map/';

    this.load.tilemapTiledJSON('map', mapAssetsPath + 'map.json');
    this.load.image('tileset',  mapAssetsPath + 'gridtiles.png');
    this.load.image('base',  mapAssetsPath + 'base.png');
    this.load.image('spawn',  mapAssetsPath + 'spawn.png');
    this.load.json('waves', mapAssetsPath + 'waves.json');
  }

  loadEnemyAssets(): void {
    const enemyAssetsPath = 'assets/enemies/';

    this.load.image('floating-eye', enemyAssetsPath + 'floating-eye.png');
  }

  loadTowerAssets(): void {
    const towerAssetsPath = 'assets/towers/';

    this.load.image('tower-basic', towerAssetsPath + 'tower-basic.png');
  }

  loadBulletAssets(): void {
    const bulletAssetsPath = 'assets/bullets/';

    this.load.image('bullet-basic', bulletAssetsPath + 'bullet-basic.png');
  }

  loadParticleAssets(): void {
    const particleAssetsPath = 'assets/particles/';

    this.load.image('particle-blue', particleAssetsPath + 'particle-blue.png');
  }

  loadGamePanelAssets(): void {
    const gamePanelAssetsPath = 'assets/ui/game-panel/';

    this.load.image('button-start-wave', gamePanelAssetsPath + 'button-start-wave.png');
    this.load.image('icon-health', gamePanelAssetsPath + 'icon-health.png');
    this.load.image('icon-gold', gamePanelAssetsPath + 'icon-gold.png');
  }

  create() {
    this.scene.switch('TitleScene');
  }
}
