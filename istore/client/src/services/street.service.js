export default function getStreets(that) {
    fetch("/api/streets")
        .then(res => res.json())
        .then(streets => {
            // console.log(streets);
            that.setState({ streets: streets });
        });
}

export function getStreetById(that, id) {
    fetch("/api/streets/" + id)
        .then(res => res.json())
        .then(street => {
            // console.log(street);
            that.setState({ street: street });
        });
}
