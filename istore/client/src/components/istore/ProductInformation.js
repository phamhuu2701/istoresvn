import React, { Component } from "react";

import ProductDetail from "./ProductDetail";

import { showHideStoreInfo, onSearchProduct } from "./Maps";
import { onZoomSearchField } from "../HomeIndex";

import "./ProductInformation.css";

let that;

export function effectStoreInformationWindow(id, info) {
    showHideStoreInfo(id, info, that);
}

export function effectOnSearchProduct(search, distance, cb) {
    onSearchProduct(search, distance, that, cb);
}

export default class StoreInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            effect: ""
        };
        this.closeStoreInfo = this.closeStoreInfo.bind(this);
        this.wrapperStoreRef = React.createRef();
    }

    componentDidMount() {
        //document.addEventListener('click', this.closeStoreInfo)
    }

    UNSAFE_componentWillMount() {
        that = this;
        //document.addEventListener('click', this.closeStoreInfo)
    }

    UNSAFE_componentWillUnmount() {
        //document.addEventListener('click', this.closeStoreInfo)
    }

    closeStoreInfo(event) {
        //document.querySelector(".store-info").style.right = "-100%";
        this.setState({
            effect: ""
        });
        onZoomSearchField("in");
    }

    render() {
        return (
            <div
                className={"store-info " + this.state.effect}
                ref={this.wrapperStoreRef}
            >
                {/* <div className="fixed-top"> */}
                <a
                    href="javascipt:void(0)"
                    className="closebtn"
                    onClick={this.closeStoreInfo}
                >
                    <img
                        src="./resources/icons/cancel.svg"
                        alt="Close Infomation Windows"
                    ></img>
                </a>
                {/* </div> */}
                <ProductDetail />
            </div>
        );
    }
}
