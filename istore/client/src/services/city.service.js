import { sortByName } from "../utils/sortModel";

export default function getCities(that) {
    fetch("/api/cities")
            .then(res => res.json())
            .then(results => {
                // console.log(results);
                that.setState({ cities: results });
            });
}

export function getCityById(that,id) {
    fetch("/api/cities/" + id)
            .then(res => res.json())
            .then(city => {
                // console.log(city);
                that.setState({ city: city });
            });
}

export function getDistrictsByIdCity(that, idCity) {
    fetch("/api/cities/" + idCity + "/districts")
            .then(res => res.json())
            .then(results => {
                // console.log(results);
                // that.setState({ districts: sortByName(results) });
                sortByName(results, () => {that.setState({ districts: results })});
            });
}

