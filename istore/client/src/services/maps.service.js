import { zoomSizeOfMap } from '../utils/mapUtil';

export function onGetCurrentPositionService(thisMap) {
    thisMap.cleanMapAndClientPosition();

    if (thisMap.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                thisMap.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            });
        }
    }
}

// Get Address or geometry (latitude and longitude)
export function onSearchProductService(
    search,
    distance,
    thisMap,
    thisStoreWindow,
    cb
) {
    try {
        // Find product and location of that products
        document.querySelector('.loading').style.display = 'block';
        document.querySelectorAll(
            'select[class="form-control"]'
        )[0].disabled = true;
        document.querySelectorAll(
            'select[class="form-control"]'
        )[1].disabled = true;
        document.querySelector('.field-results-list').style.display = 'none';
        document.querySelector('.field-results-number').textContent = `Kết quả`;

        // Hidden store information windows
        const items = document.querySelectorAll('.field-results-item');
        if (items.length > 0) {
            for (let item of items) {
                if (item.style.backgroundColor) {
                    item.style.backgroundColor = '';
                    if (thisStoreWindow.state.effect) {
                        thisStoreWindow.setState({
                            effect: ''
                        });
                    }
                }
            }
        }

        const { lat, lng } = thisMap.state.currentLocation;

        fetch(
            `/api/products?search=${search}&lat=${lat}&lng=${lng}&distance=${distance}`,
            {
                method: 'GET'
            }
        )
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    return [];
                }
            })
            .then(async res => {
                // Display result on result area
                document.querySelector('.field-results-list').style.display =
                    'block';
                document.querySelector(
                    '.field-results-number'
                ).textContent = `Kết quả (${
                    res.length > 25 ? 25 : res.length
                })`;

                // Show nearby store existing product
                thisMap.cleanMaps();
                if (res.length > 0) {
                    // Add distance into result
                    // Client's location --- origin
                    const latLng = thisMap.props.google.maps.LatLng;
                    // Stores's location --- destinations
                    const allStoreLocation = res.map(product => {
                        return [
                            product.store.location.coordinates[1],
                            product.store.location.coordinates[0]
                        ];
                    });
                    const latlngAllStores = allStoreLocation.map(loc => {
                        return new latLng(loc[0], loc[1]);
                    });
                    // Calculate distance off all store form result
                    const lastResult = [];
                    await thisMap.distanceMatrix(
                        [new latLng(lat, lng)],
                        latlngAllStores,
                        async response => {
                            const elements = await response.rows[0].elements;
                            elements.forEach((e, index) => {
                                lastResult.push({
                                    ...res[index],
                                    distance: e.distance.text
                                });
                            });
                            document.querySelector('.loading').style.display =
                                'none';
                            document.querySelectorAll(
                                'select[class="form-control"]'
                            )[0].disabled = false;
                            document.querySelectorAll(
                                'select[class="form-control"]'
                            )[1].disabled = false;
                            // Change zoom on map
                            thisMap.map.setZoom(zoomSizeOfMap(distance));

                            // Show result on result area
                            cb(lastResult);
                        }
                    );

                    thisMap.drawCircleFromCenter(
                        thisMap.state.currentLocation,
                        +distance
                    );
                    const nearbyStoreLocation = [];
                    for (let store of allStoreLocation) {
                        let loop = 0;
                        for (let sto of nearbyStoreLocation) {
                            if (sto[0] === store[0] && sto[1] === store[1]) {
                                loop = 1;
                                break;
                            }
                        }
                        if (loop === 0) {
                            nearbyStoreLocation.push(store);
                        }
                    }
                    thisMap.showNearStore(nearbyStoreLocation);

                    // Recenter map
                    thisMap.map.panTo(new latLng(lat, lng));
                } else {
                    document.querySelector('.loading').style.display = 'none';
                    document.querySelectorAll(
                        'select[class="form-control"]'
                    )[0].disabled = false;
                    document.querySelectorAll(
                        'select[class="form-control"]'
                    )[1].disabled = false;
                    // Show result in result area
                    cb(res);
                }
            })
            .catch(err => {
                console.log('Lỗi tìm kiếm. Còn lỗi gì thì không biết!');
                cb([]);
            });
    } catch (error) {
        console.log(error);
        console.log('Kết nối mạng internet yếu..');
    }
}

export function findRecentProductsService(ids, thisMap, cb) {
    if (ids && ids !== '[]') {
        document.querySelector(
            '.field-results-number'
        ).textContent = `Đã xem gần đây ${JSON.parse(ids).length}`;
        fetch('api/products/findRecentProducts?ids=' + ids, {
            method: 'GET'
        })
            .then(result => {
                document.querySelector('.loading').style.display = 'none';
                thisMap.cleanMaps();
                return result.json();
            })
            .then(products => {
                // Client's location --- origin
                const latLng = thisMap.props.google.maps.LatLng;
                const { lat, lng } = thisMap.state.currentLocation;
                // Stores's location --- destinations
                const allStoreLocation = products.map(product => {
                    return [
                        product.store.location.coordinates[1],
                        product.store.location.coordinates[0]
                    ];
                });
                const latlngAllStores = allStoreLocation.map(loc => {
                    return new latLng(loc[0], loc[1]);
                });
                // Calculate distance off all store form result
                const lastResult = [];
                thisMap.distanceMatrix(
                    [new latLng(lat, lng)],
                    latlngAllStores,
                    async response => {
                        const elements = await response.rows[0].elements;
                        elements.forEach((e, index) => {
                            lastResult.push({
                                ...products[index],
                                distance: e.distance.text
                            });
                        });
                        // Show result on result area
                        cb(lastResult);
                    }
                );
            })
            .catch(err => console.log(err));
    } else {
        document.querySelector('.loading').style.display = 'none';
        cb([]);
    }
}

// Get Address or geometry (latitude and longitude)
export function geocodingService(address, thisMap, cb) {
    const google = thisMap.props.google;
    const maps = google.maps;
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === maps.GeocoderStatus.OK) {
            // Get Lat and Lng from entered location
            const { lat, lng } = results[0].geometry.location;
            // console.log(lat(), lng());

            thisMap.cleanMapAndClientPosition();

            // Test Direction
            //thisMap.getRedirectMap(new maps.LatLng(thisMap.state.currentLocation.lat, thisMap.state.currentLocation.lng), results[0].geometry.location);

            thisMap.setState({
                currentLocation: {
                    lat: lat(),
                    lng: lng()
                }
            });

            cb(results[0].formatted_address);
        } else {
            return alert('Không tìm thấy vị trí: ' + status);
        }
    });
}

export function showNearStoreService(thisMap, markers, nearbyStore) {
    const { google } = thisMap.props;
    const maps = google.maps;

    // Add some new markers
    for (let i = 0; i < nearbyStore.length; i++) {
        setTimeout(() => {
            markers.push(
                new maps.Marker({
                    name: 'Your location!',
                    map: thisMap.map,
                    animation: maps.Animation.DROP,
                    position: new thisMap.props.google.maps.LatLng(
                        nearbyStore[i][0],
                        nearbyStore[i][1]
                    ),
                    icon: {
                        url: '../resources/icons/logo.svg',
                        anchor: new maps.Point(32, 32),
                        scaledSize: new maps.Size(30, 32)
                    }
                })
            );
        }, i * 500);
    }
}

export function getRedirectMapService(thisMap, origin, destination, cb) {
    const google = thisMap.props.google;
    const maps = google.maps;

    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    const request = {
        origin: origin,
        destination: destination,
        travelMode: thisMap.props.google.maps.TravelMode.DRIVING
    };

    directionsDisplay.setMap(thisMap.map);
    directionsService.route(request, (results, status) => {
        if (status === 'OK') {
            //if (results.geocoded_waypoints[0].place_id === directionsDisplay.directions) {}
            directionsDisplay.setDirections(results);

            // Get other values
            const otherValues = results.routes[0].legs[0];
            /*const time = otherValues.duration.text;
            const total = otherValues.distance.text;
            const from = otherValues.start_address;*/
            const to = otherValues.end_address;
            document.querySelector(
                '.product-detail-info-content-store-address'
            ).innerHTML = to;
            //console.log(`Đi từ ${from} đến ${to} dài ${total} trong ${time}`);
            cb(directionsDisplay);
        }
    });
}

export function distanceMatrixService(origin, destinations, thisMap, cb) {
    const google = thisMap.props.google;
    const maps = google.maps;
    const service = new maps.DistanceMatrixService();

    if (destinations.length > 25) {
        destinations = destinations.splice(0, 25);
        origin = origin.splice(0, 25);
    }
    service.getDistanceMatrix(
        {
            origins: origin,
            destinations: destinations,
            travelMode: 'DRIVING'
        },
        (response, status) => {
            cb(response);
        }
    );
}

export function recenterMapService(thisMap) {
    const map = thisMap.map;
    const curr = thisMap.state.currentLocation;

    const google = thisMap.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng);
        map.panTo(center);

        // FitBounds --> góc nhìn hẹp, chỉ khu vực gần kề ở vị trí muốn đặt
        //thisMap.bounds = new maps.LatLngBounds();
        //thisMap.bounds.extend(curr);

        // Set Marker after get client's current location
        setTimeout(() => {
            thisMap.marker = new maps.Marker({
                map: map,
                animation: maps.Animation.DROP,
                position: center
            });
        }, 300);
        // Change marker's animation
        setTimeout(() => {
            thisMap.marker.setAnimation(maps.Animation.BOUNCE);
        }, 5000);
    }
}

export function loadMapService(thisMap) {
    if (thisMap.props && thisMap.props.google) {
        // google is available
        const { google } = thisMap.props;
        const maps = google.maps;

        let zoom = 14;
        let lat = thisMap.state.currentLocation.lat;
        let lng = thisMap.state.currentLocation.lng;
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign(
            {},
            {
                center: center,
                zoom: zoom
            }
        );
        thisMap.map = new maps.Map(
            document.querySelector('.app-body-right'),
            mapConfig
        );
    }
}

// No complete yet Autocomplete -- Not display autocomplete
/*export function onPlaceAutocomplete (input, cb) {
    const google = this.props.google;
    const maps = google.maps;

    if (!google) return;

    this.autocomplete = new maps.places.Autocomplete(input, {
        "types": ["cities"]
    });
    this.autocomplete.bindTo('bounds', this.map);

    //this.autocomplete.setFields(['address_component', 'formatted_address']); //'geometry', 'icon', 'name'

    // After Enter --> When selected a address
    this.autocomplete.addListener('place_changed', () => {
        const addressObject = this.autocomplete.getPlace();
        cb(addressObject)
    })
}*/
