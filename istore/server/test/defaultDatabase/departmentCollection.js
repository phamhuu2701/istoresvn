const Department = require("../../models/department.model");
const DepartmentDao = require("../../dao/department.dao");

const departments = [
    { name: "Tài chính" },
    { name: "Marketing" },
    { name: "Kế hoạch" },
    { name: "Chăm sóc khách hàng" },
    { name: "Nhân sự" },
    { name: "Truyền thông" }
];

module.exports.createDefaultCollection = async (callback) => {
    const departmentsArray = await DepartmentDao.find();
    if (departmentsArray.length <= 0) {
        console.log("Department collection is empty.");
        departments.map(department => {
            const departmentNew = new Department(department);
            DepartmentDao.save(departmentNew);
        });
        console.log("Default Department collection created.");
    } else {
        console.log("Department collection existed: ", departmentsArray.length, "/", departments.length);
    }
};
