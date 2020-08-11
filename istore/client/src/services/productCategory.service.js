export function getProductCategoryById(id, callback) {
    fetch("/api/product-categories/" + id)
        .then(res => res.json())
        .then(productCategory => {
            // console.log(productCategory);
            callback(productCategory);
        })
        .catch(err => console.log(err));
}

// export function getProductCategories(callback) {
//     fetch("/api/product-categories")
//         .then(res => res.json())
//         .then(productCategories => {
//             // console.log(productCategories);
//             callback(productCategories);
//         })
//         .catch(err => {
//             console.log(err);
//             callback(null);
//         });
// }

export function getProductCategories(e) {
    fetch("/api/product-categories")
        .then(res => res.json())
        .then(productCategories => {
            // console.log(productCategories);
            e.setState({
                productCategories: productCategories
            })
        })
        .catch(err => console.log(err));
}