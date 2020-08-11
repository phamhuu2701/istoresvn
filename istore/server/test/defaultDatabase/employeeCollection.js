const Employee = require("../../models/employee.model");
const EmployeeDao = require("../../dao/employee.dao");
const UserDao = require("../../dao/user.dao");
const DepartmentDao = require("../../dao/department.dao");

module.exports.createDefaultCollection = async (callback) => {
    const employeesArray = await EmployeeDao.find();
    if (employeesArray.length <= 0) {
        console.log("Employee collection is empty.");

        const departments = await DepartmentDao.find();
        if (departments.length <= 0) {
            console.log("Department collection is empty.");
        }
        else{

            const users = await UserDao.find();
            if(users.length <= 0){
                console.log("User collection is empty.");
            }
            else{

                users.map((user, key) => {
                    if(user.authorization.name === "Employee"){
                        let employeeNew = new Employee({
                            user: user,
                            department: departments[key%departments.length],
                            salary: Math.floor(Math.random() * 1000) * 100000,
                            timeStart: new Date()
                        });

                        // console.log(employeeNew);
                        EmployeeDao.save(employeeNew);
                    }
                })
                console.log("Default Employee collection created.");
            }
        }
    } else {
        console.log("Employee collection existed: ", employeesArray.length, "/5");
    }
};
