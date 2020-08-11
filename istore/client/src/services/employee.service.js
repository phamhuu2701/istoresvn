export default function getEmployees(callback) {
    fetch("/api/employees/")
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

export function getEmployeeByUser(idUser, callback) {
    fetch("/api/employees/users/" + idUser)
        .then(res => res.json())
        .then(result => {
            callback(result);
        })
        .catch(err => console.log(err));
}

export function getEmployeeById(id, callback) {
    fetch("/api/employees/" + id)
        .then(res => res.json())
        .then(result => {
            callback(result);
        })
        .catch(err => console.log(err));
}
