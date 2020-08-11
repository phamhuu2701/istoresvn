const express = require("express");
const router = express.Router();

const DistrictDao = require("../dao/district.dao");
const StreetDao = require("../dao/street.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;
    // console.log(name);

    if (!name) {
        const streets = await StreetDao.find();
        if (!streets) {
            res.json(null);
        } else {
            res.json(streets);
        }
    } else {
        const street = await StreetDao.findOneByName(name);
        if (!street) {
            res.json(null);
        } else {
            res.json(street);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const streets = await StreetDao.findById(id);
    if (!streets) {
        res.json(null);
    } else {
        res.json(streets);
    }
});

router.route("/districts/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const district = await DistrictDao.findById(id);
    if (!district) {
        res.json(null);
    } else {
        const streets = await StreetDao.findByDistrict(district);
        if (!streets) {
            res.json(null);
        } else {
            res.json(streets);
        }
    }
});

module.exports = router;
