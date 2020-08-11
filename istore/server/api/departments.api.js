const express = require("express");
const router = express.Router();

const DepartmentDao = require("../dao/department.dao");

router.route("/").get(async (req, res, next) => {
    const name = req.query.name;

    if (!name) {
        const departments = await DepartmentDao.find();
        if (!departments) {
            res.json(null);
        } else {
            res.json(departments);
        }
    } else {
        const department = await DepartmentDao.findOneByName(name);
        if (!department) {
            res.json(null);
        } else {
            res.json(department);
        }
    }
});

router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id;
    const department = await DepartmentDao.findById(id);
    if (!department) {
        res.json(null);
    } else {
        res.json(department);
    }s
});

module.exports = router;
