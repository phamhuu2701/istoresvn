import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    formatPrice,
    getStarsArrayClassName,
    getStarsArrayClassNameOfRate,
    getStarsReviewNewest
} from "./../../utils/productUtils";

import "./ProductDetail.css";
import { formatDate2 } from "../../utils/dateUtils";
import getFullname from "../../utils/userUtils";

class ProductDetail extends Component {
    constructor() {
        super();

        this.state = {
            idProduct: null,
            desciptionTabClicked: true,
            detailsTabClicked: false,
            reviewsTabClicked: false,
            product: {
                productCategory: {},
                name: "",
                description: "",
                price: 0,
                saleoff: 0,
                images: [""],
                videos: [""],
                timestamp: null
            },
            starsClassNames: [],
            productRates: [],
            productRatesReview: [],
            userSession: null,
            stars: 0,
            fullnameInputErrorMessage: "",
            emailInputErrorMessage: "",
            contentInputErrorMessage: "",
            starsInputErrorMessage: ""
        };

        this.onDescriptionTabClick = this.onDescriptionTabClick.bind(this);
        this.onDetailsTabClick = this.onDetailsTabClick.bind(this);
        this.onReviewsTabClick = this.onReviewsTabClick.bind(this);
        this.onStarsRateClick = this.onStarsRateClick.bind(this);
        this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    }

    onDescriptionTabClick() {
        this.setState({
            desciptionTabClicked: true,
            detailsTabClicked: false,
            reviewsTabClicked: false
        });
    }

    onDetailsTabClick() {
        this.setState({
            desciptionTabClicked: false,
            detailsTabClicked: true,
            reviewsTabClicked: false
        });
    }

    onReviewsTabClick() {
        this.setState({
            desciptionTabClicked: false,
            detailsTabClicked: false,
            reviewsTabClicked: true
        });
    }

    UNSAFE_componentWillMount() {
        const locationPathnameArray = window.location.pathname.split("/");
        const idProduct =
            locationPathnameArray[locationPathnameArray.length - 1] === ""
                ? locationPathnameArray[locationPathnameArray.length - 2]
                : locationPathnameArray[locationPathnameArray.length - 1];
        // console.log(idProduct);

        this.setState({
            idProduct: idProduct
        });

        // fetch("/api/products/" + idProduct)
        //     .then(res => res.json())
        //     .then(product => {
        //         this.setState({
        //             product: product
        //         });
        //     });
    }

    componentDidMount() {
        fetch("/api/products/" + this.state.idProduct)
            .then(res => res.json())
            .then(product => {
                // update rates
                this.setState({
                    product: product,
                    starsClassNames: getStarsArrayClassName(product),
                    productRatesReview: getStarsReviewNewest(product, 5)
                });

                // update review
                // console.log(this.state.product.rates);
                let productRates = [];
                for (let rate of product.rates) {
                    rate.rateStarClassName = [];
                    for (let i = 0; i < rate.stars; i++) {
                        rate.rateStarClassName.push("fa fa-star");
                    }
                    for (let i = 0; i < 5 - rate.stars; i++) {
                        rate.rateStarClassName.push("fa fa-star empty");
                    }
                    productRates.push(rate);
                }
                this.setState({
                    productRates: productRates
                });
            });

        fetch("/api/login")
            .then(res => res.json())
            .then(result => {
                if (result.isLogged === true) {
                    this.setState({
                        userSession: result.user
                    });
                }
            });
    }

    onStarsRateClick(e) {
        // console.log(e.target.value);
        this.setState({
            stars: e.target.value
        });
    }

    onSubmitButtonClick() {
        let fullname = document.getElementById("input-fullname").value;
        let email = document.getElementById("input-email").value;
        let content = document.getElementById("input-content").value;

        if (fullname === "") {
            this.setState({
                fullnameInputErrorMessage: "Họ tên không được để trống."
            });
        } else {
            this.setState({
                fullnameInputErrorMessage: ""
            });
        }

        if (email === "") {
            this.setState({
                emailInputErrorMessage: "Email không được để trống."
            });
        } else {
            this.setState({
                emailInputErrorMessage: ""
            });
        }

        if (content === "") {
            this.setState({
                contentInputErrorMessage: "Hãy nhập gì đó đánh giá về sản phẩm."
            });
        } else {
            this.setState({
                contentInputErrorMessage: ""
            });
        }

        if (this.state.stars === 0) {
            this.setState({
                starsInputErrorMessage: "Bạn chưa đánh giá chất lượng sản phẩm."
            });
        } else {
            this.setState({
                starsInputErrorMessage: ""
            });
        }

        // console.log(fullname);
        // console.log(email);
        // console.log(content);
        // console.log(this.state.stars);

        if (
            fullname !== "" &&
            email !== null &&
            (content !== "") & (this.state.stars !== 0)
        ) {
            fetch("/api/products/" + this.state.idProduct, {
                method: "PUT",
                body: JSON.stringify({
                    rate: {
                        fullname: fullname,
                        email: email,
                        content: content,
                        stars: this.state.stars,
                        timestamp: new Date()
                    }
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(productUpdate => {
                    // console.log("Update success!");
                    // console.log(productUpdate);
                    // console.log(productUpdate.rates);

                    this.setState({
                        productRatesReview: getStarsReviewNewest(
                            productUpdate,
                            5
                        ),

                    });
                });
        }
    }

    render() {
        let descriptionHeaderTabClassname = this.state.desciptionTabClicked
            ? "active"
            : "";
        let detailsHeaderTabClassname = this.state.detailsTabClicked
            ? "active"
            : "";
        let reviewsHeaderTabClassname = this.state.reviewsTabClicked
            ? "active"
            : "";
        let descriptionTabClassName = this.state.desciptionTabClicked
            ? "active"
            : "fade";
        let detailsTabClassName = this.state.detailsTabClicked
            ? "active"
            : "fade";
        let reviewsTabClassName = this.state.reviewsTabClicked
            ? "active"
            : "fade";

        // console.log(this.props);
        // console.log(window.location.pathname.split("/"));
        // console.log(this.state.product);

        return (
            <div className="ProductDetail">
                {/* section */}
                <div className="section">
                    {/* container */}
                    <Container>
                        {/* row */}
                        <Row>
                            {/*  Product Details */}
                            <Col md="6">
                                <div className="product product-details clearfix">
                                    <div id="product-main-view">
                                        <div className="product-view">
                                            <img
                                                src={
                                                    this.state.product.images[0]
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="product product-details clearfix">
                                    <div className="product-body">
                                        <div className="product-label">
                                            <span>Mới</span>
                                            <span className="sale">
                                                giảm{" "}
                                                {this.state.product.saleoff}%
                                            </span>
                                        </div>
                                        <h2 className="product-name">
                                            {this.state.product.name}
                                        </h2>
                                        <h3 className="product-price">
                                            {formatPrice(
                                                (this.state.product.price /
                                                    100) *
                                                    (100 -
                                                        this.state.product
                                                            .saleoff)
                                            )}
                                            đ
                                            <del className="product-old-price">
                                                {formatPrice(
                                                    this.state.product.price
                                                )}
                                                đ
                                            </del>
                                        </h3>
                                        <div>
                                            <div className="product-rating">
                                                {this.state.starsClassNames.map(
                                                    (starsClassName, i) => (
                                                        <i
                                                            key={i}
                                                            className={
                                                                starsClassName
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <a
                                                href="#tab3"
                                                onClick={this.onReviewsTabClick}
                                            >
                                                {
                                                    this.state
                                                        .productRatesReview
                                                        .length
                                                }{" "}
                                                Đánh giá / Thêm đánh giá
                                            </a>
                                        </div>
                                        <p>
                                            {this.state.product.description.substring(
                                                0,
                                                250
                                            )}
                                            ...
                                        </p>
                                        <div className="product-options">
                                            <ul className="size-option">
                                                <li>
                                                    <span className="text-uppercase">
                                                        Kích thước:
                                                    </span>
                                                </li>
                                            </ul>
                                            <ul className="color-option">
                                                <li>
                                                    <span className="text-uppercase">
                                                        Màu sắc:
                                                    </span>
                                                </li>
                                            </ul>
                                            <ul className="brand-option">
                                                <li>
                                                    <span className="text-uppercase">
                                                        Thương hiệu:
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product-btns">
                                            <div className="qty-input">
                                                <span className="text-uppercase">
                                                    Số lượng:{" "}
                                                </span>
                                                <input
                                                    className="input"
                                                    type="number"
                                                    defaultValue="1"
                                                />
                                            </div>
                                            <button className="primary-btn add-to-cart">
                                                <i className="fa fa-shopping-cart" />{" "}
                                                Mua ngay
                                            </button>
                                            <div className="pull-right">
                                                <button className="main-btn icon-btn">
                                                    <i className="fa fa-heart" />
                                                </button>
                                                <button className="main-btn icon-btn">
                                                    <i className="fa fa-compass" />
                                                </button>
                                                <button className="main-btn icon-btn">
                                                    <i className="fa fa-share-alt" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            {/* /Product Details */}
                        </Row>
                        <Row>
                            <div className="col-md-12 store-product-detail-list-images">
                                <div className="product-tab">
                                    <ul className="tab-nav">
                                        <li className="active">
                                            <span>Hình ảnh</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row">
                                    {this.state.product.images.map(
                                        (image, i) => (
                                            <div key={i} className="col-md-3">
                                                <div className="product-view product-view-custom">
                                                    <img
                                                        key={i}
                                                        src={image}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="product-tab">
                                    <ul className="tab-nav">
                                        <li
                                            className={
                                                descriptionHeaderTabClassname
                                            }
                                        >
                                            <span
                                                onClick={
                                                    this.onDescriptionTabClick
                                                }
                                            >
                                                Mô tả
                                            </span>
                                        </li>
                                        <li
                                            className={
                                                detailsHeaderTabClassname
                                            }
                                        >
                                            <span
                                                onClick={this.onDetailsTabClick}
                                            >
                                                Chi tiết
                                            </span>
                                        </li>
                                        <li
                                            id="tab3"
                                            className={
                                                reviewsHeaderTabClassname
                                            }
                                        >
                                            <span
                                                onClick={this.onReviewsTabClick}
                                            >
                                                Đánh giá
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div
                                            className={
                                                "tab-pane in " +
                                                descriptionTabClassName
                                            }
                                        >
                                            <p>
                                                {this.state.product.description}
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                "tab-pane in " +
                                                detailsTabClassName
                                            }
                                        >
                                            <p>
                                                {this.state.product.description}
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                "tab-pane in " +
                                                reviewsTabClassName
                                            }
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="product-reviews">
                                                        {this.state
                                                            .productRatesReview &&
                                                            this.state.productRatesReview.map(
                                                                (rate, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="single-review"
                                                                    >
                                                                        <div className="review-heading">
                                                                            <div>
                                                                                <Link to="#">
                                                                                    <i className="fa fa-user" />{" "}
                                                                                    {
                                                                                        rate.fullname
                                                                                    }
                                                                                </Link>
                                                                            </div>
                                                                            <div>
                                                                                <Link to="#">
                                                                                    <i className="fa fa-clock" />{" "}
                                                                                    {formatDate2(
                                                                                        rate.timestamp
                                                                                    )}
                                                                                </Link>
                                                                            </div>
                                                                            <div className="review-rating pull-right">
                                                                                {getStarsArrayClassNameOfRate(
                                                                                    rate
                                                                                ).map(
                                                                                    (
                                                                                        starsClassName,
                                                                                        i
                                                                                    ) => (
                                                                                        <i
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className={
                                                                                                starsClassName
                                                                                            }
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="review-body">
                                                                            <p>
                                                                                {
                                                                                    rate.content
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}

                                                        <ul className="reviews-pages">
                                                            <li className="active">
                                                                1
                                                            </li>
                                                            <li>
                                                                <Link to="#">
                                                                    2
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#">
                                                                    3
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#">
                                                                    <i className="fa fa-caret-right" />
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4 className="text-uppercase">
                                                        Viết đánh giá của bạn
                                                    </h4>
                                                    <p>
                                                        Địa chỉ email của bạn sẽ
                                                        không được công bố.
                                                    </p>
                                                    <form className="review-form">
                                                        <div className="form-group">
                                                            <input
                                                                id="input-fullname"
                                                                className="input"
                                                                type="text"
                                                                placeholder="Họ tên"
                                                                defaultValue={
                                                                    this.state
                                                                        .userSession &&
                                                                    getFullname(
                                                                        this
                                                                            .state
                                                                            .userSession
                                                                    )
                                                                }
                                                            />
                                                            <span
                                                                className={
                                                                    "message " +
                                                                    (this.state
                                                                        .fullnameInputErrorMessage ===
                                                                    ""
                                                                        ? "ok"
                                                                        : "error")
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .fullnameInputErrorMessage
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                id="input-email"
                                                                className="input"
                                                                type="email"
                                                                placeholder="Email"
                                                                defaultValue={
                                                                    this.state
                                                                        .userSession &&
                                                                    this.state
                                                                        .userSession
                                                                        .email
                                                                }
                                                            />
                                                            <span
                                                                className={
                                                                    "message " +
                                                                    (this.state
                                                                        .emailInputErrorMessage ===
                                                                    ""
                                                                        ? "ok"
                                                                        : "error")
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .emailInputErrorMessage
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <textarea
                                                                id="input-content"
                                                                className="input"
                                                                placeholder="Nội dung đáng giá"
                                                                defaultValue={
                                                                    ""
                                                                }
                                                            />
                                                            <span
                                                                className={
                                                                    "message " +
                                                                    (this.state
                                                                        .contentInputErrorMessage ===
                                                                    ""
                                                                        ? "ok"
                                                                        : "error")
                                                                }
                                                            >
                                                                {
                                                                    this.state
                                                                        .contentInputErrorMessage
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-rating">
                                                                <strong className="text-uppercase">
                                                                    Đánh giá:{" "}
                                                                </strong>
                                                                <div className="stars">
                                                                    <input
                                                                        type="radio"
                                                                        id="star5"
                                                                        name="rating"
                                                                        defaultValue={
                                                                            5
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .onStarsRateClick
                                                                        }
                                                                    />
                                                                    <label htmlFor="star5" />
                                                                    <input
                                                                        type="radio"
                                                                        id="star4"
                                                                        name="rating"
                                                                        defaultValue={
                                                                            4
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .onStarsRateClick
                                                                        }
                                                                    />
                                                                    <label htmlFor="star4" />
                                                                    <input
                                                                        type="radio"
                                                                        id="star3"
                                                                        name="rating"
                                                                        defaultValue={
                                                                            3
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .onStarsRateClick
                                                                        }
                                                                    />
                                                                    <label htmlFor="star3" />
                                                                    <input
                                                                        type="radio"
                                                                        id="star2"
                                                                        name="rating"
                                                                        defaultValue={
                                                                            2
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .onStarsRateClick
                                                                        }
                                                                    />
                                                                    <label htmlFor="star2" />
                                                                    <input
                                                                        type="radio"
                                                                        id="star1"
                                                                        name="rating"
                                                                        defaultValue={
                                                                            1
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .onStarsRateClick
                                                                        }
                                                                    />
                                                                    <label htmlFor="star1" />
                                                                </div>
                                                                <div>
                                                                    <span
                                                                        className={
                                                                            "message " +
                                                                            (this
                                                                                .state
                                                                                .starsInputErrorMessage ===
                                                                            ""
                                                                                ? "ok"
                                                                                : "error")
                                                                        }
                                                                    >
                                                                        {
                                                                            this
                                                                                .state
                                                                                .starsInputErrorMessage
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="primary-btn"
                                                            onClick={
                                                                this
                                                                    .onSubmitButtonClick
                                                            }
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        {/* /row */}
                    </Container>
                    {/* /container */}
                </div>
                {/* /section */}
            </div>
        );
    }
}

export default ProductDetail;
