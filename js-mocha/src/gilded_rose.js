class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    static isConjured(item) {
        return item.name.includes('Conjured');
    }

    static hasSellBy(item) {
        return item.name !== 'Sulfuras, Hand of Ragnaros';
    }

    static isIncreaseRequired(item) {
        return (item.name === 'Aged Brie') || (item.name === 'Backstage passes to a TAFKAL80ETC concert');
    }

    static decreaseQuality(item) {
        let quality = item.quality;
        if (quality > 0) {
            if (Shop.isConjured(item) || item.sellIn <= 0) {
                quality = Math.max(0, (quality - 2));
            } else {
                quality--;
            }
        }
        return quality;
    }

    static increaseQuality(item) {
        let quality = item.quality;
      const maxQuality = 50;
      const fiveDayThreshold = 5;
      const tenDayThreshold = 10;
      if (quality < maxQuality) {
            quality++;
              if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
              if (item.sellIn <= tenDayThreshold && quality < maxQuality) {
                    quality++;
                }
              if (item.sellIn <= fiveDayThreshold && quality < maxQuality) {
                    quality++;
                }
                if (item.sellIn <= 0) {
                    quality = 0
                }
            }
        }

        return quality;
    }

    updateQuality() {
        this.items.forEach(item => {
            if (Shop.hasSellBy(item)) {
                if (Shop.isIncreaseRequired(item)) {
                    item.quality = Shop.increaseQuality(item);
                } else {
                    item.quality = Shop.decreaseQuality(item);
                }
                item.sellIn = item.sellIn - 1;
            }
        });
        return this.items;
    }
}

module.exports = {
    Item,
    Shop
};
