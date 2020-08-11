import { getStoreViewsCount2 } from "../services/store.service";

export function sortProductByRating(stores) {
    stores.sort((first, second) => {
        return first._doc.rateAvg - second._doc.rateAvg;
    });
}

export function sortProductByDistance(stores) {
    stores.sort((first, second) => {
        if (first.distance < second.distance) return -1;
        else if (first.distance > second.distance) return 1;
        else return 0;
    });
}

export function sortIncreseProductByPrice(stores) {
    stores.sort((first, second) => {
        return (
            first._doc.price * ((100 - first._doc.saleoff) / 100) -
            second._doc.price * ((100 - second._doc.saleoff) / 100)
        );
    });
}

export function sortDescreseProductByPrice(stores) {
    stores.sort((first, second) => {
        return (
            second._doc.price * ((100 - second._doc.saleoff) / 100) -
            first._doc.price * ((100 - first._doc.saleoff) / 100)
        );
    });
}

export function sortByName(array, callback) {
    array.sort((first, second) => {
        if (first.name < second.name) return -1;
        else if (first.name > second.name) return 1;
        else return 0;
    });

    callback();
}

export function sortDescreseStoresByView(stores, callback) {
    callback(
        stores.sort((a, b) => {
            let first = getStoreViewsCount2(a);
            let second = getStoreViewsCount2(b);
            return second - first;
        })
    );
}

export function sortDescreseStoreModelsByView(stores, callback) {
    callback(
        stores.sort((a, b) => {
            let first = a.viewsCount;
            let second = b.viewsCount;
            return second - first;
        })
    );
}

export function sortDescreseProductsByView(products, callback) {
    callback(
        products.sort((a, b) => {
            let first = a.views ? a.views.length : 0;
            let second = b.views ? b.views.length : 0;
            return second - first;
        })
    );
}

export function sortDescreseUserByStore(users, callback) {
    callback(
        users.sort((a, b) => {
            let first = a.stores ? a.stores.length : 0;
            let second = b.stores ? b.stores.length : 0;
            return second - first;
        })
    );
}

