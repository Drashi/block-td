import { Tower } from './tower';
import { TowerBasic } from './types/towerBasic';

export class TowerFactory {
  towerTypes: {} = {
    TowerBasic
  };

  constructor() {}

  getInstance<Tower>(type: string, ...args: any[]): Tower {
    const tower = this.towerTypes[type];
    const instance = Object.create(tower.prototype);
    instance.constructor.apply(instance, args);

    return <Tower> instance;
  }
}
