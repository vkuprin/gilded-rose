import { GildedRose, Item } from "../src/utils/GildedRose";

describe("Gilded Rose", () => {
  it('should degrade "Conjured" items twice as fast as normal items', () => {
    const items = [new Item("Conjured Mana Cake", 3, 6)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });

  it("should not decrease quality below zero", () => {
    const items = [new Item("Conjured Mana Cake", 3, 0)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should handle "Aged Brie" correctly', () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  it('should handle "Sulfuras" correctly', () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it('should handle "Backstage passes" correctly', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  it('should drop "Backstage passes" quality to 0 after the concert', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });
});

