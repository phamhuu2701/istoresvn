import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";

import { onSearchAddress, onGetCurrentPosition } from './Maps'

import "./Logo.css";


class SearchPlace extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.onEnterPlace = this.onEnterPlace.bind(this);
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
    }

    getCurrentPosition() {
        onGetCurrentPosition();
    }

    onEnterPlace(e) {
        //onChangeSearchAddress(e.target.value);
        if (e.which === 13 || e.which === 10) {
            onSearchAddress(e.target.value, formattedAddress => {
                // Set full address in search input
                this.autocompleteInput.current.value = formattedAddress;
            });
        } else {
            //this.handleScriptLoad();
            //onPlaceAutocomplete(this.autocompleteInput.current)
        }
    }

    componentDidMount() {
        /*setTimeout(() => {
            onPlaceAutocomplete(this.autocompleteInput.current, (addressObject) => {
                //this.props.onPlaceLoaded(addressObject);
                const address = addressObject.address_components;
                if (address){
                    this.setState({
                        city: address[0].long_name,
                        query: addressObject.formatted_address
                    })
                }
            })
        }, 2000);*/

    }

    render() {
        return (
            <Col>
                <Form.Group className="field-filter-form-group-search">
                    <img 
                        title="Vị trí của bạn" 
                        alt="Vị trí của bạn" 
                        src="./resources/icons/current-location-white.svg"
                        onClick={this.getCurrentPosition}
                    />
                    <div>
                        <Form.Control
                            type="text"
                            size="sm"
                            ref={this.autocompleteInput}
                            placeholder="Nhập vị trí..."
                            className="field-filter-form-input-search"
                            onKeyPress={this.onEnterPlace}
                        />
                    </div>
                </Form.Group>
            </Col>
        )
    }
}

export default class Logo extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img
                        className="logo-image"
                        alt="Istore"
                        src="./resources/icons/logo.svg"
                    />
                    <span className="logo-title">iStore</span>
                </div>
                <div className="place">
                    <SearchPlace/>
                </div>
            </div>
        );
    }
}
