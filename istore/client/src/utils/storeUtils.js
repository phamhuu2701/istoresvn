// lấy danh sách product categories ID trong store
export function getProductCategoriesId(store) {
    let productCategoriesId = [];
    for (let product of store.products) {
        // kiểm tra product category đã tồn tại trong mảng
        if (
            !checkProductCategoryIdExist(
                product.productCategory,
                productCategoriesId
            )
        ) {
            productCategoriesId.push(product.productCategory);
        }
    }
    return productCategoriesId;
}

// kiểm tra product category ID đã tồn tại trong mảng
export function checkProductCategoryIdExist(
    productCategoryId,
    productCategoriesId
) {
    // console.log(productCategories);
    for (let pcId of productCategoriesId) {
        if (pcId === productCategoryId) {
            return true;
        }
    }
    return false;
}

// lấy top 10 products mới nhất trong store
export function sortDescreseProductByPrice(stores) {
    stores.sort((first, second) => {
        return (
            second._doc.price * ((100 - second._doc.saleoff) / 100) -
            first._doc.price * ((100 - first._doc.saleoff) / 100)
        );
    });
}

// lấy full địa chỉ
export function getFullAddress(store) {
    if (!store) {
        return null;
    } else {
        return (
            store.houseNumber +
            " " +
            store.street.name +
            ", " +
            store.district.name +
            ", " +
            store.city.name
        );
    }
}
