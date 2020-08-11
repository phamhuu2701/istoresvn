const ProductCategory = require("../../models/productCategory.model");
const ProductCategoryDao = require("../../dao/productCategory.dao");

const productCategories = [ 
    "Điện thoại", 
    "Thiết bị điện tử", 
    "Thiết bị điện dân dụng",
    "Thiết bị văn phòng",
    "Sách",
    "Khác"
];

module.exports.createDefaultCollection = async () => {
    const productCategoriesArray = await ProductCategoryDao.find();
    if (productCategoriesArray.length <= 0) {
        console.log("ProductCategory collection is empty.");
        productCategories.map(productCategory => {
            const productCategoryNew = new ProductCategory({
                name: productCategory
            });
            ProductCategoryDao.save(productCategoryNew);
        });
        console.log("Default ProductCategory collection created.");
    } else {
        console.log("ProductCategory collection existed: ", productCategoriesArray.length, "/6");
    }
};
