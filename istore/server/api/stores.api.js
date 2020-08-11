const express = require("express");
const router = express.Router();

const StoreDao = require("../dao/store.dao");
const Store = require("../models/store.model");

const UserDao = require("../dao/user.dao");

router
    .route("/")
    .get(async (req, res, next) => {
        const name = req.query.name;
        // console.log(name);

        if (!name) {
            const stores = await StoreDao.find();
            if (!stores) {
                res.json(null);
            } else {
                res.json(stores);
            }
        } else {
            const store = await StoreDao.findByName(name);
            if (!store) {
                res.json(null);
            } else {
                res.json(store);
            }
        }
    })
    .post(async (req, res, next) => {
        let store = req.body;
        store = new Store(store);

        // console.log("new store: ", store);

        let storeSave = await StoreDao.save(store);
        res.json(storeSave);
    });

router.route("/:id").get(async (req, res, next) => {
    let id = req.params.id;
    let store = await StoreDao.findById(id);
    if (!store) {
        res.json(null);
    } else {
        res.json(store);
    }
});

router.route("/:id/products").get(async (req, res, next) => {
    let id = req.params.id;
    let store = await StoreDao.findById(id);
    if (!store) {
        res.json(null);
    } else {
        res.json(store);
    }
});

router.route("/:template/:id").get(async (req, res, next) => {
    let id = req.params.id;
    let store = await StoreDao.findById(id);
    if (!store) {
        res.json(null);
    } else {
        res.json(store);
    }
});

module.exports = router;
