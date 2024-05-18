export class Item {
  constructor(
      public name: string,
      public sellIn: number,
      public quality: number
  ) {}
}

abstract class UpdatableItem {
  constructor(protected item: Item) {}

  abstract update(): void;

  protected increaseQuality(amount: number = 1): void {
    this.item.quality = Math.min(50, this.item.quality + amount);
  }

  protected decreaseQuality(amount: number = 1): void {
    this.item.quality = Math.max(0, this.item.quality - amount);
  }

  protected decreaseSellIn(): void {
    this.item.sellIn -= 1;
  }

  protected isExpired(): boolean {
    return this.item.sellIn < 0;
  }
}

class NormalItem extends UpdatableItem {
  update(): void {
    this.decreaseQuality();
    this.decreaseSellIn();
    if (this.isExpired()) {
      this.decreaseQuality();
    }
  }
}

class AgedBrie extends UpdatableItem {
  update(): void {
    this.increaseQuality();
    this.decreaseSellIn();
    if (this.isExpired()) {
      this.increaseQuality();
    }
  }
}

class Sulfuras extends UpdatableItem {
  update(): void {}
}

class BackstagePasses extends UpdatableItem {
  update(): void {
    if (this.item.sellIn > 10) {
      this.increaseQuality();
    } else if (this.item.sellIn > 5) {
      this.increaseQuality(2);
    } else if (this.item.sellIn > 0) {
      this.increaseQuality(3);
    } else {
      this.item.quality = 0;
    }
    this.decreaseSellIn();
  }
}

class ConjuredItem extends UpdatableItem {
  update(): void {
    this.decreaseQuality(2);
    this.decreaseSellIn();
    if (this.isExpired()) {
      this.decreaseQuality(2);
    }
  }
}

export class GildedRose {
  constructor(public items: Item[]) {}

  private getItemWrapper(item: Item): UpdatableItem {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrie(item);
      case 'Sulfuras, Hand of Ragnaros':
        return new Sulfuras(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePasses(item);
      default:
        return item.name.startsWith('Conjured')
            ? new ConjuredItem(item)
            : new NormalItem(item);
    }
  }

  updateQuality(): Item[] {
    for (const item of this.items) {
      this.getItemWrapper(item).update();
    }
    return this.items;
  }
}
