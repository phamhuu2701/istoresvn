import React, { Component } from "react";
import { Container, Row, Col, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductCategoriesId } from "./../../utils/storeUtils";

import "./Header.css";

class Header extends Component {
    constructor() {
        super();

        this.state = {
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            navToggleButtonClicked: false,
            responsiveNavClicked: false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            menuNavAboutUsClicked: false,
            productCategories: []
        };

        this.categoryHeaderOnClick = this.categoryHeaderOnClick.bind(this);
        this.menuHeaderOnClick = this.menuHeaderOnClick.bind(this);
        this.navToggleButtonOnClick = this.navToggleButtonOnClick.bind(this);
        this.responsiveNavOnClick = this.responsiveNavOnClick.bind(this);
        this.onTopHeaderLanguageClick = this.onTopHeaderLanguageClick.bind(this);
        this.onTopHeaderMoneyClick = this.onTopHeaderMoneyClick.bind(this);
        this.onHeaderTopHeaderAccountClick = this.onHeaderTopHeaderAccountClick.bind(this);
        this.onHeaderTopHeaderCartClick = this.onHeaderTopHeaderCartClick.bind(this);
        this.onMenuNavAboutUsClick = this.onMenuNavAboutUsClick.bind(this);
    }

    categoryHeaderOnClick() {
        this.setState({
            categoryHeaderClicked: this.state.categoryHeaderClicked ? false : true,
            menuHeaderClicked: this.state.categoryHeaderClicked === true ? false : false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            menuNavAboutUsClicked: false
        });
    }

    menuHeaderOnClick() {
        this.setState({
            menuHeaderClicked: this.state.menuHeaderClicked ? false : true,
            categoryHeaderClicked: this.state.menuHeaderClicked === true ? false : false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            menuNavAboutUsClicked: false,
        });
    }

    navToggleButtonOnClick() {
        this.setState({
            navToggleButtonClicked: true,
            responsiveNavClicked: true,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            menuNavAboutUsClicked: false,
        });
    }

    responsiveNavOnClick(event) {
        if (event.target.getAttribute("id") === "navigation") {
            this.setState({
                navToggleButtonClicked: false,
                responsiveNavClicked: false
            });
        }
    }

    onTopHeaderLanguageClick(){
        this.setState({
            topHeaderLanguageClicked: this.state.topHeaderLanguageClicked ? false : true,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            navToggleButtonClicked: false,
            responsiveNavClicked: false,
            menuNavAboutUsClicked: false
        });
    }

    onTopHeaderMoneyClick(){
        this.setState({
            topHeaderMoneyClicked: this.state.topHeaderMoneyClicked ? false : true,
            topHeaderLanguageClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            navToggleButtonClicked: false,
            responsiveNavClicked: false,
            menuNavAboutUsClicked: false,
        });
    }

    onHeaderTopHeaderAccountClick(){
        this.setState({
            headerTopHeaderAccountClicked: this.state.headerTopHeaderAccountClicked ? false : true,
            headerTopHeaderCartClicked: false,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            navToggleButtonClicked: false,
            responsiveNavClicked: false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            menuNavAboutUsClicked: false
        });
    }

    onHeaderTopHeaderCartClick(){
        this.setState({
            headerTopHeaderCartClicked: this.state.headerTopHeaderCartClicked ? false : true,
            headerTopHeaderAccountClicked: false,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            navToggleButtonClicked: false,
            responsiveNavClicked: false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            menuNavAboutUsClicked: false
        });
    }

    onMenuNavAboutUsClick(){
        this.setState({
            menuNavAboutUsClicked: this.state.menuNavAboutUsClicked ? false : true,
            categoryHeaderClicked: false,
            menuHeaderClicked: false,
            topHeaderLanguageClicked: false,
            topHeaderMoneyClicked: false,
            headerTopHeaderAccountClicked: false,
            headerTopHeaderCartClicked: false
        });
    }

    componentDidMount(){
        const productCategoriesId = getProductCategoriesId(this.props.store);
        // console.log(productCategoriesId);

        for (let productCategoryId of productCategoriesId){
            fetch("/api/product-categories/" + productCategoryId)
            .then(res => res.json())
            .then(productCategory => {
                this.setState({
                    productCategory: this.state.productCategories.push(productCategory)
                });
            });
        }
        // console.log(this.state.productCategories);
    }

    render() {
        let topHeaderLanguageClassName = this.state.topHeaderLanguageClicked ? "open" : "";
        let topHeaderMoneyClassName = this.state.topHeaderMoneyClicked ? "open" : "";
        let headerTopHeaderAccountClassName = this.state.headerTopHeaderAccountClicked ? "open" : "";
        let headerTopHeaderCartClassName = this.state.headerTopHeaderCartClicked ? "open" : "";
        let categoryListClassName = this.state.categoryHeaderClicked ? "open" : "";
        let menuListClassName = this.state.menuHeaderClicked ? "open" : "";
        let navigationClassName = this.state.navToggleButtonClicked ? "shadow" : "";
        let responsiveNavClassName = this.state.responsiveNavClicked ? "open" : "";
        let menuNavAboutUsClassName = this.state.menuNavAboutUsClicked ? "open" : "";

        return (
            <div className="StoreHeader">
                {/* HEADER */}
                <div className="store-header">
                    {/* top Header */}
                    <div id="top-header" className="store-header-top">
                        <Container>
                            <Row>
                                <Col md="6">
                                    <div className="pull-left">
                                        <span>
                                            Welcome to <b>{this.props.store.name}!</b>
                                        </span>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="pull-right">
                                    <ul className="header-top-links">
                                        <li><Link to={"/store/" + this.props.store.template + "/" + this.props.store._id}>Trang chủ</Link></li>
                                        <li><Link to={"/store/" + this.props.store.template + "/" + this.props.store._id + "/products"}>Sản phẩm</Link></li>
                                        <li><Link to={"/store/" + this.props.store.template + "/" + this.props.store._id}>Bản tin</Link></li>
                                        <li className={"dropdown default-dropdown header-top-dropdown " + topHeaderLanguageClassName} onClick={this.onTopHeaderLanguageClick}>
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">VN</span>
                                            <ul className="custom-menu">
                                                <li><span>Vietnam (VN)</span></li>
                                                <li><span>English (ENG)</span></li>
                                                <li><span>Russian (Ru)</span></li>
                                                <li><span>French (FR)</span></li>
                                                <li><span>Spanish (Es)</span></li>
                                            </ul>
                                        </li>
                                        <li className={"dropdown default-dropdown header-top-dropdown " + topHeaderMoneyClassName} onClick={this.onTopHeaderMoneyClick}>
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">VND</span>
                                            <ul className="custom-menu">
                                                <li><span>VND (VND)</span></li>
                                                <li><span>USD ($)</span></li>
                                                <li><span>EUR (€)</span></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* /top Header */}
                    {/* header */}
                    <div id="header" className="store-header-main">
                        <Container>
                            <Row>
                                <Col md="2">
                                    <div className="pull-left">
                                        {/* Logo */}
                                        <div className="header-logo store-header-logo">
                                            <Link className="logo" to={"/store/" + this.props.store.template + "/" + this.props.store._id}>
                                                <img
                                                    src={this.props.store.logo}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        {/* /Logo */}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="pull-left">
                                        {/* Search */}
                                        <div className="header-search">
                                            <Form>
                                                <FormControl
                                                    className="input search-input"
                                                    type="text"
                                                    placeholder="Tìm kiếm"
                                                />
                                                <select className="input search-categories search-categories-custom">
                                                    <option value={-1}>
                                                        Danh mục
                                                    </option>
                                                    {this.state.productCategories.map(
                                                        (productCategory, i) => (
                                                            <option key={i} value={i}>
                                                                {productCategory.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <button className="search-btn">
                                                    <i className="fa fa-search" />
                                                </button>
                                            </Form>
                                        </div>
                                        {/* /Search */}
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="pull-right">
                                        <ul className="header-btns header-btns-custom">
                                            {/* Account */}
                                            <li className={"header-account dropdown default-dropdown header-top-dropdown " + headerTopHeaderAccountClassName} onClick={this.onHeaderTopHeaderAccountClick}>
                                                <div className="dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                                                    <div className="header-btns-icon">
                                                        <i className="fa fa-user"></i>
                                                    </div>
                                                    <strong className="text-uppercase">Tài khoản</strong>
                                                </div>
                                                <Link to="#" className="text-uppercase">Tài khoản</Link>
                                                <ul className="custom-menu">
                                                    <li><span><i className="fa fa-user"></i> Tài khoản</span></li>
                                                    <li><span><i className="fa fa-heart"></i> Ưu thích</span></li>
                                                    <li><span><i className="fa fa-compass"></i> So sánh</span></li>
                                                    <li><span><i className="fa fa-check"></i> Thanh toán</span></li>
                                                    <li><span><i className="fa fa-unlock-alt"></i> Đăng nhập</span></li>
                                                    <li><span><i className="fa fa-user-plus"></i> Đăng ký</span></li>
                                                </ul>
                                            </li>
                                            {/* /Account */}
                                            {/* Cart */}
                                            <li className={"header-cart dropdown default-dropdown " + headerTopHeaderCartClassName} onClick={this.onHeaderTopHeaderCartClick}>
                                                <span className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <div className="header-btns-icon">
                                                        <i className="fa fa-shopping-cart"></i>
                                                        <label className="qty">0</label>
                                                    </div>
                                                    <strong className="text-uppercase">Giỏ hàng</strong>
                                                </span>
                                                <Link to="#" className="text-uppercase">0 VND</Link>
                                                <div className="custom-menu">
                                                    <div id="shopping-cart">
                                                        {/* <div className="shopping-cart-list">
                                                            <div className="product product-widget">
                                                                <div className="product-thumb">
                                                                    <img src="./img/thumb-product01.jpg" alt="" />
                                                                </div>
                                                                <div className="product-body">
                                                                    <h3 className="product-price">$32.50 <span className="qty">x3</span></h3>
                                                                    <h2 className="product-name"><a href="#">Product Name Goes Here</a></h2>
                                                                </div>
                                                                <button className="cancel-btn"><i className="fa fa-trash"></i></button>
                                                            </div>
                                                        </div> */}
                                                        <div className="shopping-cart-btns">
                                                            <button className="main-btn">View Cart</button>
                                                            <button className="primary-btn">Checkout <i className="fa fa-arrow-circle-right"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {/* /Cart */}
                                            {/* Mobile nav toggle*/}
                                            <li className="nav-toggle">
                                                <button
                                                    className="nav-toggle-btn main-btn icon-btn"
                                                    onClick={this.navToggleButtonOnClick}
                                                >
                                                    <i className="fa fa-bars" />
                                                </button>
                                            </li>
                                            {/* / Mobile nav toggle */}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        {/* header */}
                    </div>
                    {/* container */}
                </div>
                {/* /HEADER */}
                {/* NAVIGATION */}
                <div>
                    <div
                        id="navigation"
                        className={"navigation " + navigationClassName}
                        onClick={this.responsiveNavOnClick}
                    >
                        {/* container */}
                        <div className="container">
                            <div
                                id="responsive-nav"
                                className={responsiveNavClassName}
                            >
                                {/* category nav */}
                                <div className="category-nav show-on-click">
                                    <span
                                        className="category-header"
                                        onClick={this.categoryHeaderOnClick}
                                    >
                                        Danh mục <i className="fa fa-list" />
                                    </span>
                                    <ul className={"category-list " + categoryListClassName}>
                                        <li className="dropdown side-dropdown">
                                            {this.state.productCategories.map(
                                                (productCategory, i) => (
                                                    <span key={i}>
                                                        {productCategory.name}
                                                        <label className="dropdown-fa-angle-right">
                                                            <i className="fa fa-angle-right" />
                                                        </label>
                                                    </span>
                                                )
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                {/* /category nav */}
                                {/* menu nav */}
                                <div className="menu-nav">
                                    <span
                                        className="menu-header"
                                        onClick={this.menuHeaderOnClick}
                                    >
                                        Menu <i className="fa fa-bars" />
                                    </span>
                                    <ul className={"menu-list " + menuListClassName}>
                                        <li>
                                            <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id}>Trang chủ</Link>
                                        </li>
                                        <li>
                                            <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id + "/products"}>Sản phẩm</Link>
                                        </li>
                                        <li className="dropdown mega-dropdown">
                                            <Link
                                                to="#"
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true"
                                            >
                                                Hot
                                            </Link>
                                        </li>
                                        <li className="dropdown mega-dropdown full-width">
                                            <Link
                                                to="#"
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true"
                                            >
                                                Mới
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id + "/products"}>Khuyến mãi</Link>
                                        </li>
                                        <li className={"dropdown default-dropdown menu-nav-about-us " + menuNavAboutUsClassName}
                                            onClick={this.onMenuNavAboutUsClick}>
                                            <Link
                                                to="#"
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-expanded="true"
                                            >
                                                Giới thiệu
                                            </Link>
                                            <ul className="custom-menu">
                                                <li>
                                                    <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id}>
                                                        Trang chủ
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id + "/products"}>
                                                        Sản phẩm
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Hướng dẫn
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Liên hệ
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                {/* menu nav */}
                            </div>
                        </div>
                        {/* /container */}
                    </div>
                </div>
                {/* /NAVIGATION */}
                {/* BREADCRUMB */}
                <div id="breadcrumb">
                    <div className="container">
                        <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id}>{this.props.store.name}</Link>
                        <span className="breadcrumb-header">
                            <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                            ></i>
                            {/* <Link to={"/store/" + this.props.store.template + "/" + this.props.store._id + "/products"}>Danh sách sản phẩm</Link> */}
                        </span>
                    </div>
                </div>
                {/* /BREADCRUMB */}
            </div>
        );
    }
}

export default Header;
