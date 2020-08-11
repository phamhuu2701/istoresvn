const express = require("express");
const router = express.Router();

const StoreCategoryDao = require("../dao/storeCategory.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;
    // console.log(name);

    if (!name) {
        const storeCategorys = await StoreCategoryDao.find();
        if (!storeCategorys) {
            res.json(null);
        } else {
            res.json(storeCategorys);
        }
    } else {
        const storeCategory = await StoreCategoryDao.findOneByName(name);
        if (!storeCategory) {
            res.json(null);
        } else {
            res.json(storeCategory);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const storeCategory = await StoreCategoryDao.findById(id);
    if (!storeCategory) {
        res.json(null);
    } else {
        res.json(storeCategory);
    }
});

module.exports = router;
