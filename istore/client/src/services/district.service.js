import { sortByName } from "../utils/sortModel";

export default function getDistricts(that) {
    fetch("/api/districts")
            .then(res => res.json())
            .then(results => {
                // console.log(results);
                that.setState({ cities: results });
            });
}

export function getDistrictById(that, id) {
    fetch("/api/districts/" + id)
            .then(res => res.json())
            .then(district => {
                // console.log(district);
                that.setState({ district: district });
            });
}

export function getStreetsByIdDistrict(that, idDistrict) {
    fetch("/api/districts/" + idDistrict + "/streets")
            .then(res => res.json())
            .then(results => {
                // console.log(results);
                // that.setState({ districts: sortByName(results) });
                sortByName(results, () => {that.setState({ streets: results })});
            });
}
