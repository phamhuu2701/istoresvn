const express = require("express");
const router = express.Router();

const SearchKeyDao = require("../dao/searchKey.dao");

router.route("/").get(async (req, res, next) => {
    const searchKeys = await SearchKeyDao.find();
    if (!searchKeys) {
        res.json(null);
    } else {
        res.json(searchKeys);
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const searchKey = await SearchKeyDao.findById(id);
    if (!searchKey) {
        res.json(null);
    } else {
        res.json(searchKey);
    }
});

module.exports = router;
