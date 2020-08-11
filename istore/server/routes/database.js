const express = require("express");
const router = express.Router();

const citiesCollection = require("../test/defaultDatabase/cityCollection");
const districtsCollection = require("../test/defaultDatabase/districtCollection");
const streetCollection = require("../test/defaultDatabase/streetCollection");
const authorizationCollection = require("../test/defaultDatabase/authorizationCollection");
const userCollection = require("../test/defaultDatabase/userCollection");
const productCategoryCollection = require("../test/defaultDatabase/productCategoryCollection");
const productCollection = require("../test/defaultDatabase/productCollection");
const storeCategoryCollection = require("../test/defaultDatabase/storeCategoryCollection");
const storeCollection = require("../test/defaultDatabase/storeCollection");
const updateStoreCollection = require("../test/defaultDatabase/updateStoreCollection");
const updateProductsView = require("../test/defaultDatabase/updateProductsView");
const departmentCollection = require("../test/defaultDatabase/departmentCollection");
const employeeCollection = require("../test/defaultDatabase/employeeCollection");
const searchKeyCollection = require("../test/defaultDatabase/searchKeyCollection");

const cityDao = require("../dao/city.dao");
const districtDao = require("../dao/district.dao");
const streetDao = require("../dao/street.dao");
const authorizationDao = require("../dao/authorization.dao");
const userDao = require("../dao/user.dao");
const storeCategoryDao = require("../dao/storeCategory.dao");
const storeDao = require("../dao/store.dao");
const productCategotyDao = require("../dao/productCategory.dao");
const productDao = require("../dao/product.dao");
const departmentDao = require("../dao/department.dao");
const employeeDao = require("../dao/employee.dao");
const searchKeyDao = require("../dao/searchKey.dao");

createDatebase = async callback => {
    let cities = await cityDao.find();
    let districts = await districtDao.find();
    let streets = await streetDao.find();
    let authorizations = await authorizationDao.find();
    let users = await userDao.find();
    let storeCategories = await storeCategoryDao.find();
    let stores = await storeDao.find();
    let productCategories = await productCategotyDao.find();
    let products = await productDao.find();
    let departments = await departmentDao.find();
    let employees = await employeeDao.find();
    let searchKeys = await searchKeyDao.find();

    console.log("================================");

    citiesCollection.createDefaultCollection();
    setTimeout(() => {
        districtsCollection.createDefaultCollection();
    }, 2000);
    setTimeout(() => {
        streetCollection.createDefaultCollection();
    }, 4000);

    authorizationCollection.createDefaultCollection();
    setTimeout(() => {
        userCollection.createDefaultCollection();
    }, 2000);

    productCategoryCollection.createDefaultCollection();
    setTimeout(() => {
        productCollection.createDefaultCollection();
    }, 2000);
    if(products.length > 0){
        updateProductsView.updateProductsView();
    }

    storeCategoryCollection.createDefaultCollection();
    if (
        storeCategories.length > 0 &&
        cities.length > 0 &&
        districts.length > 0 &&
        streets.length > 0 &&
        users.length > 0
    ) {
        storeCollection.createDefaultCollection();
        setTimeout(() => {
            updateStoreCollection.updateCollection();
        }, 4000);
    }

    departmentCollection.createDefaultCollection();
    if (departments.length > 0 && users.length > 0) {
        employeeCollection.createDefaultCollection();
    }

    searchKeyCollection.createDefaultCollection();
        
    setTimeout(() => {
        if (
            cities.length > 0 &&
            districts.length > 0 &&
            streets.length > 0 &&
            authorizations.length > 0 &&
            users.length > 0 &&
            storeCategories.length > 0 &&
            stores.length > 0 &&
            productCategories.length > 0 &&
            products.length > 0 &&
            departments.length > 0 &&
            employees.length > 0 &&
            searchKeys.length > 0
        ) {
            
            console.log("================================");
            console.log("Database created!");
    
            callback(true);
        } else {
            
            console.log("================================");
            console.log(
                "Creating database not success. Try again: refresh page 'http://localhost:5000/create-database'"
            );
    
            callback(false);
        }
    }, 10000);

    
};

/* GET home page. */
router.get("/", function(req, res, next) {
    createDatebase(result => {
        if (result) {
            res.send("Database created!");
        } else {
            res.send(
                "Creating database not success. Try again: refresh page 'http://localhost:5000/create-database'"
            );
        }
    });
});

module.exports = router;
