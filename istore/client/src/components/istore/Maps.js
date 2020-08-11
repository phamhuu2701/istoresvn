import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  /*InfoWindow,*/ Marker,
  GoogleApiWrapper
} from 'google-maps-react';

import { Spinner } from 'react-bootstrap';

import {
  onGetCurrentPositionService,
  geocodingService,
  onSearchProductService,
  findRecentProductsService,
  showNearStoreService,
  getRedirectMapService,
  distanceMatrixService,
  recenterMapService,
  loadMapService
} from '../../services/maps.service.js';
import { showHideStoreInfoService } from '../../services/store.service';

import './Maps.css';

let markers = [],
  currentDirection = null,
  currentCircle = null,
  that;

export function onGetCurrentPosition() {
  onGetCurrentPositionService(that);
}

export function onSearchAddress(address, cb) {
  geocodingService(address, that, cb);
}

export function onSearchProduct(search, distance, thisStoreWindow, cb) {
  onSearchProductService(search, distance, that, thisStoreWindow, cb);
}

export function findRecentProducts(ids, cb) {
  findRecentProductsService(ids, that, cb);
}

export function showHideStoreInfo(id, info, thisStoreWindow) {
  showHideStoreInfoService(id, info, that, thisStoreWindow);
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  UNSAFE_componentWillMount() {
    that = this;
  }

  componentDidMount() {
    onGetCurrentPosition();
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    //this.map.fitBounds(this.bounds);
  }

  recenterMap() {
    recenterMapService(this);
  }

  loadMap() {
    loadMapService(this);
  }

  cleanMaps(clearStore = true) {
    // Clear current direction if existing
    if (currentDirection) {
      currentDirection.setMap(null);
      currentDirection = null;
    }

    // Clear current circle if existing
    if (currentCircle) {
      currentCircle.setMap(null);
      currentCircle = null;
    }

    if (clearStore) {
      this.clearNearstore();
    }
  }

  cleanMapAndClientPosition() {
    this.cleanMaps();
    // Clear old marker of client's location
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  distanceMatrix(origin, destinations, cb) {
    distanceMatrixService(origin, destinations, this, cb);
  }

  showNearStore(nearbyStore) {
    this.clearNearstore();
    showNearStoreService(this, markers, nearbyStore);
  }

  clearNearstore() {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
  }

  getRedirectMap(origin, destination) {
    getRedirectMapService(this, origin, destination, result => {
      currentDirection = result;
    });
  }

  drawCircleFromCenter(center, radius) {
    currentCircle = new this.props.google.maps.Circle({
      strokeColor: '#888', // Màu viên
      strokeOpacity: 0.5, // Độ mờ viền
      strokeWeight: 1, // Độ mảnh của đường tròn
      fillColor: '#03A9F4', // Màu nền của đường tròn
      fillOpacity: 0.1, // Độ trong suốt của nền
      map: this.map, // Hiển thị trên map nào
      center: { lat: center.lat, lng: center.lng }, // tạo độ trung tâm
      radius: radius // bán kính
    });
  }

  render() {
    return (
      <div className='map'>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={this.state.currentLocation}
        >
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
};
MapContainer.defaultProps = {
  zoom: 13,
  // Ben Thanh market, by default
  initialCenter: {
    lat: 10.772967,
    lng: 106.698077
  },
  centerAroundCurrentLocation: true
};

const LoadingContainer = props => (
  <div className='loadingMaps'>
    Đang tải bản đồ
    <Spinner animation='grow' variant='success' size='sm' />
    <Spinner animation='grow' variant='success' size='sm' />
    <Spinner animation='grow' variant='success' size='sm' />
  </div>
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD9mzilMG4xBbeqNYQpBzLysB2YMxWVNfs',
  language: 'vi-vn',
  LoadingContainer: LoadingContainer
})(MapContainer);
