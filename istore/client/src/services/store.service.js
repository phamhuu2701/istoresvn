import {
    sortProductByDistance,
    sortIncreseProductByPrice,
    sortDescreseProductByPrice,
    sortProductByRating
} from '../utils/sortModel';
import { showProductDetail } from '../components/istore/ProductDetail';
import { onZoomSearchField } from '../components/HomeIndex';
import getAvgRatesProduct from './product.service';
import {
    sortIncreaseProductsByViewsCount,
    sortDescreaseProductsByViewsCount
} from '../utils/productUtils';

import Cookies from 'js-cookie';

export function showHideStoreInfoService(
    index,
    info,
    thisMap,
    thisStoreWindow
) {
    //const storeInfo = document.querySelector(".store-info");
    const items = document.querySelectorAll('.field-results-item');
    if (
        items[index].style.backgroundColor === '' ||
        //storeInfo.style.right === "-100%"
        thisStoreWindow.state.effect === ''
    ) {
        onZoomSearchField('out');
        if (items[index].style.backgroundColor !== '') {
            //storeInfo.style.right = "0px";
            thisStoreWindow.setState({
                effect: 'show'
            });
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].style.backgroundColor = '';
            }

            showProductDetail(info);

            // Marker

            //storeInfo.style.right = "0px";
            thisStoreWindow.setState({
                effect: 'show'
            });
            items[index].style.backgroundColor = '#C7F0AA';

            // Insert product into client's cookie
            let recentProducts = Cookies.get('recentProducts');
            const id = info._doc._id;
            if (recentProducts) {
                // Convert to array from string
                recentProducts = JSON.parse(recentProducts);
                if (recentProducts.includes(id)) {
                    // Remove old element
                    recentProducts.splice(recentProducts.indexOf(id), 1);
                }

                // Remove element if = 10 elements
                if (recentProducts.length === 10) {
                    recentProducts.pop();
                }
                // Push to top array
                recentProducts.unshift(id);
                recentProducts = JSON.stringify(recentProducts);
            } else {
                recentProducts = JSON.stringify([id]);
            }
            Cookies.set('recentProducts', recentProducts);
        }
    } else {
        //storeInfo.style.right = "-100%";
        thisStoreWindow.setState({
            effect: ''
        });
        onZoomSearchField('in');
        items[index].style.backgroundColor = '';
    }

    // Address
    const latlng = {
        lat: parseFloat(info.store.location.coordinates[1]),
        lng: parseFloat(info.store.location.coordinates[0])
    };
    // Redirect from  client's location to shop's location
    const latLng = thisMap.props.google.maps.LatLng;
    const { lat, lng } = thisMap.state.currentLocation;
    thisMap.cleanMaps(false);
    thisMap.getRedirectMap(
        new latLng(lat, lng),
        new latLng(latlng.lat, latlng.lng)
    );
}

export function onZoomSearchFieldService(that, zoom) {
    that.onZoom(zoom);
}

export function onSortStoreListService(stores, priority, cb) {
    document.querySelector('.loading').style.display = 'block';
    if (stores.length > 1) {
        switch (+priority) {
            case 0:
                sortProductByRating(stores);
                break;
            case 1:
                sortProductByDistance(stores);
                break;
            case 2:
                sortIncreseProductByPrice(stores);
                break;
            case 3:
                sortDescreseProductByPrice(stores);
                break;
            default:
                // console.log("0");
                break;
        }
    }
    cb(stores);
}

export function addStore(store, callback) {
    fetch('/api/stores', {
        method: 'POST',
        headers: {
            Accept: 'application',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(store)
    })
        .then(res => res.json())
        .then(store => {
            // return stores;

            if (store) {
                callback('Thêm cửa hàng thành công!');
            } else {
                callback('Thêm cửa hàng thất bại.');
            }
        })
        .catch(err => console.log(err));
}

export function getStoreById(id, callback) {
    fetch('/api/stores/' + id)
        .then(res => res.json())
        .then(store => {
            if (store) {
                callback(store);
            } else {
                callback(null);
            }
        })
        .catch(err => console.log(err));
}

export function getAvgRatesStore(store) {
    let sumAvgStarsProducts = 0;
    let rateCountsProducts = 0;
    if (store.products.length > 0) {
        store.products.map((product, key) => {
            let avgRatesProduct = getAvgRatesProduct(product);
            if (avgRatesProduct > 0) {
                sumAvgStarsProducts += avgRatesProduct;
                rateCountsProducts++;
            }
            return null;
        });

        if (rateCountsProducts > 0) {
            // console.log(sumAvgStarsProducts / rateCountsProducts);
            return sumAvgStarsProducts / rateCountsProducts;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export function getStoreViewsCount(store, callback) {
    if (store.products.length > 0) {
        let storeViewsCount = 0;
        store.products.map((product, key) => {
            storeViewsCount += product.viewsCount.length;

            return null;
        });

        callback(storeViewsCount);
    } else {
        callback(0);
    }
}

export function getStoreViewsCount2(store) {
    if (store.products) {
        let storeViewsCount = 0;
        store.products.map((product, key) => {
            storeViewsCount += product.viewsCount.length;

            return null;
        });

        return storeViewsCount;
    } else {
        return 0;
    }
}

export function getTopProductsViewsCount(store, isIncrease, callback) {
    if (store.products.length > 0) {
        // sắp xếp tăng dần
        if (isIncrease) {
            callback(sortIncreaseProductsByViewsCount(store.products));
        } else {
            callback(sortDescreaseProductsByViewsCount(store.products));
        }
    } else {
        callback([]);
    }
}

export function getStores(callback) {
    fetch('/api/stores/')
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

/**
 * storeModel = {store: store, viewCount: Number}
 * @param {*} callback
 */
export function getStoreModels(callback) {
    fetch('/api/stores/')
        .then(res => res.json())
        .then(stores => {
            if (stores.length > 0) {
                let storeModels = [];
                for (let i = 0; i < stores.length; i++) {
                    let viewsCount = 0;
                    if (stores[i].products.length > 0) {
                        for (let j = 0; j < stores[i].products.length; j++) {
                            viewsCount +=
                                stores[i].products[j].viewsCount.length;
                        }
                    }
                    storeModels.push({
                        store: stores[i],
                        viewsCount: viewsCount
                    });

                    if (storeModels.length === stores.length) {
                        callback(storeModels);
                    }
                }
            }
        })
        .catch(err => console.log(err));
}
