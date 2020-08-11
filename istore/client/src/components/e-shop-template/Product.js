import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getStarsArrayClassName } from "./../../utils/productUtils";

import "./Product.css";

class Product extends Component {
    constructor() {
        super();

        this.state = {
            starsClassNames: []
        };
    }

    componentDidMount() {     
        this.setState({
            starsClassNames: getStarsArrayClassName(this.props.product)
        });
    }

    render() {
        if (this.props.product && this.props.store) {
            return (
                <div className="col-md-4 col-xs-6">
                    <div className="product product-single">
                        <div className="product-thumb">
                            <Link
                                to={
                                    "/store/" +
                                    this.props.store.template +
                                    "/" +
                                    this.props.store._id +
                                    "/products/" +
                                    this.props.product._id
                                }
                            >
                                <button className="main-btn quick-view">
                                    <i className="fa fa-search-plus" /> Xem chi
                                    tiết
                                </button>
                            </Link>
                            <img src={this.props.product.images[0]} alt="" />
                        </div>
                        <div className="product-body">
                            <h3 className="product-price">
                                {formatPrice(
                                    (this.props.product.price / 100) *
                                        (100 - this.props.product.saleoff)
                                )}
                                đ
                                <del className="product-old-price">
                                    {formatPrice(this.props.product.price)}đ
                                </del>
                            </h3>
                            <div className="product-rating">
                                {this.state.starsClassNames.map(
                                    (starsClassName, i) => (
                                        <i key={i} className={starsClassName} />
                                    )
                                )}
                            </div>
                            <h2 className="product-name">
                                <Link
                                    to={
                                        "/store/" +
                                        this.props.store.template +
                                        "/" +
                                        this.props.store._id +
                                        "/products/" +
                                        this.props.product._id
                                    }
                                >
                                    {this.props.product.name.substring(0, 30)}
                                </Link>
                            </h2>
                            <div className="product-btns">
                                <button className="main-btn icon-btn">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="main-btn icon-btn">
                                    <i className="fa fa-compass" />
                                </button>
                                <button className="primary-btn add-to-cart">
                                    <i className="fa fa-shopping-cart" /> Mua
                                    ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default Product;
