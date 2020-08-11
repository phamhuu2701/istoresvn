const express = require("express");
const router = express.Router();

const AuthorizationDao = require("../dao/authorization.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;
    // console.log(name);

    if (!name) {
        const authorizations = await AuthorizationDao.find();
        if (!authorizations) {
            res.json(null);
        } else {
            res.json(authorizations);
        }
    } else {
        const authorization = await AuthorizationDao.findOneByName(name);
        if (!authorization) {
            res.json(null);
        } else {
            res.json(authorization);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const authorization = await AuthorizationDao.findById(id);
    if (!authorization) {
        res.json(null);
    } else {
        res.json(authorization);
    }
});

module.exports = router;
