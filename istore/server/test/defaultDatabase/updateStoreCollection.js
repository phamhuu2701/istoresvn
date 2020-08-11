const Store = require("../../models/store.model");
const StoreDao = require("../../dao/store.dao");
const ProductDao = require("../../dao/product.dao");

module.exports.updateCollection = async () => {
    const stores = await StoreDao.find(); //3
    if (stores.length > 0) {
        if (stores[0].products.length > 0) {
            // console.log("Store.products document existed");
        } else {
            const products = await ProductDao.find();
            if (products.length > 0) {
                stores.map(async (store, i) => {
                    for (let j = i*4; j < (i+1)*4; j++) {
                        store.products.push(products[j]);
                        StoreDao.update(store);
                    }
                });
            } else {
                console.log("Product collection empty");
            }
        }
    } else {
        console.log("Store collection empty");
    }
};
