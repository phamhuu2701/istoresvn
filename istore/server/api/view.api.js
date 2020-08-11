const express = require("express");
const router = express.Router();

const ProductDao = require("../dao/product.dao");

const slug = require("../util/slug");

router.route("/products").get(async (req, res, next) => {

    // Find product by product name
    ProductDao.find()
        .then(products => {
            if (products.length > 0) {
                return res.status(200).json(products);
            } else {
                return res
                    .status(201)
                    .json({ mesage: "Không tìm thấy sản phẩm mong muốn!" });
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;
