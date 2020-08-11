const StoreCategory = require("../../models/storeCategory.model");
const StoreCategoryDao = require("../../dao/storeCategory.dao");

const storeCategogys = [
    "Siêu thị điện máy thông minh",
    "Cửa hàng tạp hoá",
    "Cửa hàng văn phòng phẩm",
    "Hiệu bánh",
    "Nhà hàng",
    "Nhà sách",
    "Nhà thuốc",
    "Quán ăn",
    "Quán cafe",
    "Quán cơm",
    "Quán trà",
    "Quán trà sữa",
    "Khác"
];

module.exports.createDefaultCollection = async () => {
    const storeCategogysArray = await StoreCategoryDao.find();
    if (storeCategogysArray.length <= 0) {
        console.log("StoreCategory collection is empty.");
        storeCategogys.map(storeCategogy => {
            const storeCategogyNew = new StoreCategory({
                name: storeCategogy
            });
            StoreCategoryDao.save(storeCategogyNew);
        });
        console.log("Default StoreCategory collection created.");
    } else {
        console.log("StoreCategory collection existed: ", storeCategogysArray.length, "/13");
    }
};
