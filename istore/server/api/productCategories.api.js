const express = require("express");
const router = express.Router();

const ProductCategoryDao = require("../dao/productCategory.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;
    // console.log(name);

    if (!name) {
        const productCategories = await ProductCategoryDao.find();
        if (!productCategories) {
            res.json(null);
        } else {
            res.json(productCategories);
        }
    } else {
        const productCategorie = await ProductCategoryDao.findOneByName(name);
        if (!productCategorie) {
            res.json(null);
        } else {
            res.json(productCategorie);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const productCategorie = await ProductCategoryDao.findById(id);
    if (!productCategorie) {
        res.json(null);
    } else {
        res.json(productCategorie);
    }
});

module.exports = router;
