export default function getStoreCategories(that) {
    fetch("/api/store-categories")
            .then(res => res.json())
            .then(results => {
                // console.log(results);
                that.setState({ storeCategories: results });
            });
}

export function getStoreCategoryById(that, id) {
    fetch("/api/store-categories/" + id)
            .then(res => res.json())
            .then(storeCategory => {
                // console.log(storeCategory);
                that.setState({ storeCategory: storeCategory });
            });
}

