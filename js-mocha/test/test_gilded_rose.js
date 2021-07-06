var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("Aged Brie", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 3, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(14);
  });

  it("Backstage Passes less than 10", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(15);
  });

  it("Backstage Passes less than 5", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 3, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(16);
  });

  it("Backstage Passes post concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Generic item pre sell by", function() {
    const gildedRose = new Shop([ new Item("item", 6, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it("Generic item post sell by", function() {
    const gildedRose = new Shop([ new Item("item", -1, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it("Quality <= 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 6, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Sulfuras", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 6, 13) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
  });

  it("Quality never negative", function() {
    const gildedRose = new Shop([new Item("Item", 6, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Conjured item", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 6, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });


});
