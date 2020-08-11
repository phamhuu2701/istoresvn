const express = require("express");
const router = express.Router();

const EmployeeDao = require("../dao/employee.dao");
const UserDao = require("../dao/user.dao");

router.route("/").get(async (req, res, next) => {
    const employees = await EmployeeDao.find();
    res.json(employees);
});

router.route("/:id").get(async (req, res, next) => {
    let id = req.params.id;
    let employee = await EmployeeDao.findById(id);
    res.json(employee);
});

router.route("/users/:id").get(async (req, res, next) => {
    let id = req.params.id;
    let user = await UserDao.findById(id);
    let employee = await EmployeeDao.findOneByUser(user);
    res.json(employee);
});

module.exports = router;
