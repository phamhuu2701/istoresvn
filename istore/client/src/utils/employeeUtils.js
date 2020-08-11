// sắp xếp employees thời gian cũ nhất lên trước
export default function sortIncreaseEmployeesByTimestamp(employees) {
    employees.sort((first, second) => {
        return first.timeStart - second.timeStart;
    });
    return employees;
}

// sắp xếp employees thời gian mới nhất lên trước
export function sortDescreaseEmployeesByTimestamp(employees) {
    employees.sort((first, second) => {
        return second.timeStart - first.timeStart;
    });
    return employees;
}
