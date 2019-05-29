import { Tower } from './tower';
import { Basic } from './types/basic';

export class TowerFactory {
  towerTypes: {} = {
    Basic
  };

  constructor() {}

  getInstance<Tower>(type: string, ...args: any[]): Tower {
    const tower = this.towerTypes[type];
    const instance = Object.create(tower.prototype);
    instance.constructor.apply(instance, args);

    return <Tower> instance;
  }
}
