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

    static conjured(item) {
        return item.name.includes('Conjured');
    }

    static hasSellBy(item) {
        return item.name !== 'Sulfuras, Hand of Ragnaros';
    }

    static increaseRequired(item) {
        return (item.name === 'Aged Brie') || (item.name === 'Backstage passes to a TAFKAL80ETC concert');
    }

    static decrease(item) {
        let quality = item.quality;
        if (quality > 0) {
            if (Shop.conjured(item) || item.sellIn <= 0) {
                quality = Math.max(0, (quality - 2));
            } else {
                quality--;
            }
        }
        return quality;
    }

    static increase(item) {
        let quality = item.quality;
        if (quality < 50) {
            quality++;
            if (item.name === 'Aged Brie') {
                if (item.sellIn < 0 && quality < 50) quality++;
            } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.sellIn <= 10 && quality < 50) {
                    quality++;
                }
                if (item.sellIn <= 5 && quality < 50) {
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
                if (Shop.increaseRequired(item)) {
                    item.quality = Shop.increase(item);
                } else {
                    item.quality = Shop.decrease(item);
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
