import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Product from "./Product";
import { sortIncreaseProductsByTimestamp } from "../../utils/productUtils";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            bannerUrl:
                "https://cdn141.picsart.com/305306793032201.jpg?c256x256",
            bannerCollection1Url:
                "https://cdn141.picsart.com/305306793032201.jpg?c256x256",
            bannerCollection2Url:
                "https://cdn141.picsart.com/305306793032201.jpg?c256x256",
            bannerCollection3Url:
                "https://cdn141.picsart.com/305306793032201.jpg?c256x256",
            top12ProductsNew: []
        };
    }
    
    componentDidMount() {
        const store = this.props.store;
        if (store.products.length >= 4) {
            this.setState({
                bannerUrl: store.products[0].images[0],
                bannerCollection1Url: store.products[1].images[0],
                bannerCollection2Url: store.products[2].images[0],
                bannerCollection3Url: store.products[3].images[0]
            });
        } else {
            if (store.products.length >= 1) {
                this.setState({
                    bannerUrl: store.products[0].images[0],
                    bannerCollection1Url: store.products[0].images[0],
                    bannerCollection2Url: store.products[0].images[0],
                    bannerCollection3Url: store.products[0].images[0]
                });
            }
        }

        let productsInscreaseByTimestame = sortIncreaseProductsByTimestamp(this.props.store.products);
        if(productsInscreaseByTimestame.length > 12){
            for(let i=0; i<12; i++){
                if(productsInscreaseByTimestame[i] != null){
                    this.setState({
                        top12ProductsNew: this.state.top12ProductsNew.push(productsInscreaseByTimestame[i])
                    });
                }
            }
        }
        else{
            this.setState({
                top12ProductsNew: productsInscreaseByTimestame
            });
        }        
    }

    render() {
        // console.log(this.props);
        if (this.props.store) {
            return (
                <div className="Home">
                    {/* BANNER */}
                    <div className="section">
                        {/* container */}
                        <div className="container">
                            {/* banner */}
                            <div className="banner banner-1 banner-custom">
                                <img src={this.state.bannerUrl} alt="" />
                                <div className="banner-caption text-center">
                                    <h1 className="primary-color">
                                        SIÊU KHUYẾN MÃI
                                        <br />
                                        <span className="white-color font-weak">
                                            UP TO 50% OFF
                                        </span>
                                    </h1>
                                    <button className="primary-btn">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                            {/* /banner */}
                        </div>
                        {/* /container */}
                    </div>
                    {/* /BANNER */}
                    {/* SECTION */}
                    <div className="container">
                        <div className="row">
                            {/* section-title */}
                            <div className="col-md-12">
                                <div className="section-title section-title-custom">
                                    <h2 className="title">SẢN PHẨM NỔI BẬT</h2>
                                </div>
                            </div>
                            {/* /section-title */}
                            {this.state.top12ProductsNew.length > 0 && this.state.top12ProductsNew.map((product, i) => (
                                <Product
                                    key={i}
                                    product={product}
                                    store={this.props.store}
                                />
                            ))}
                            {/* /Product Slick */}
                        </div>
                    </div>
                    {/* /SECTION */}
                    {/* COLLECTIONS */}
                    <div className="section">
                        {/* container */}
                        <div className="container">
                            {/* row */}
                            <div className="row">
                                {/* banner */}
                                <div className="col-md-4 col-sm-6">
                                    <Link
                                        className="banner banner-1 banner-1-collection"
                                        to="#"
                                    >
                                        <img
                                            src={
                                                this.state.bannerCollection1Url
                                            }
                                            alt=""
                                        />
                                        <div className="banner-caption text-center">
                                            <h2 className="white-color">
                                                HIỆN ĐẠI
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                {/* /banner */}
                                {/* banner */}
                                <div className="col-md-4 col-sm-6">
                                    <Link
                                        className="banner banner-1 banner-1-collection"
                                        to="#"
                                    >
                                        <img
                                            src={
                                                this.state.bannerCollection2Url
                                            }
                                            alt=""
                                        />
                                        <div className="banner-caption text-center">
                                            <h2 className="white-color">
                                                CHẤT LƯỢNG
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                {/* /banner */}
                                {/* banner */}
                                <div className="col-md-4">
                                    <Link
                                        className="banner banner-1 banner-1-collection"
                                        to="#"
                                    >
                                        <img
                                            src={
                                                this.state.bannerCollection3Url
                                            }
                                            alt=""
                                        />
                                        <div className="banner-caption text-center">
                                            <h2 className="white-color">
                                                GIÁ HỢP LÝ
                                            </h2>
                                        </div>
                                    </Link>
                                </div>
                                {/* /banner */}
                            </div>
                            {/* /row */}
                        </div>
                        {/* /container */}
                    </div>
                    {/* /COLLECTIONS */}
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default Home;
