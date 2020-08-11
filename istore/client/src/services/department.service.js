export default function getDepartments(callback) {
    fetch("/api/departments")
        .then(res => res.json())
        .then(results => {
            callback(results);
        });
}
