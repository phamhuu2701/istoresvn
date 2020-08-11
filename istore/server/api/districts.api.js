const express = require("express");
const router = express.Router();

const DistrictDao = require("../dao/district.dao");
const StreetDao = require("../dao/street.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;
    // console.log(name);

    if (!name) {
        const districts = await DistrictDao.find();
        if (!districts) {
            res.json(null);
        } else {
            res.json(districts);
        }
    } else {
        const district = await DistrictDao.findOneByName(name);
        if (!district) {
            res.json(null);
        } else {
            res.json(district);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const district = await DistrictDao.findById(id);
    if (!district) {
        res.json(null);
    } else {
        res.json(district);
    }
});

router.route("/:id/streets").get(async (req, res, next) => {
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
