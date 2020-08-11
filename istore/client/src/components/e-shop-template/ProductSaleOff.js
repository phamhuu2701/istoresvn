import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getStarsArrayClassName } from "./../../utils/productUtils";

import "./ProductSaleOff.css";

class ProductSaleOff extends Component {
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
                <div>
                    <div className="product product-widget">
                        <div className="product-thumb">
                            <img src={this.props.product.images[0]} alt="" />
                        </div>
                        <div className="product-body">
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
                                    {this.props.product.name.substring(0, 20)}
                                </Link>
                            </h2>
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
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default ProductSaleOff;
