import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  sortDescreaseProductsBySaleoff,
  sortDescreaseProductsByTimestamp,
  sortIncreaseProductsByPrice,
  sortDescreaseProductsByPrice  
} from "./../../utils/productUtils";

import "./Products.css";
import Product from "./Product";
import ProductSaleOff from "./ProductSaleOff";
import { getNewArrayBySize } from "../../utils/arrayUtils";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      top3ProductsSaleoff: [],
      top12ProductsNew: [],
      productsSize: 12
    };

    this.onSortProductsChange = this.onSortProductsChange.bind(this);
  }

  onSortProductsChange(event) {
    // console.log(typeof event.target.value);
    let array = [];
    switch (event.target.value) {
      // mới nhất
      case "0":
        // console.log("Sắp xếp tất cả (mới nhất)");
        array = sortDescreaseProductsByTimestamp(this.props.store.products);
        break;

      // mới nhất
      case "1":
        // console.log("Sắp xếp mới nhất");
        array = sortDescreaseProductsByTimestamp(this.props.store.products);        
        break;

      // giảm giá nhiều nhất
      case "2":
        // console.log("Sắp xếp giảm giá nhiều");
        array = sortDescreaseProductsBySaleoff(this.props.store.products);
        break;

      // giá tăng dần
      case "3":
        // console.log("Sắp xếp giá tăng dần");
        array = sortIncreaseProductsByPrice(this.props.store.products);
        break;

      // giá giảm dần
      case "4":
        // console.log("Sắp xếp giá giảm dần");
        array = sortDescreaseProductsByPrice(this.props.store.products);
        break;

      default:
        // mới nhất
        array = sortDescreaseProductsByTimestamp(this.props.store.products);
    }
    this.setState({
      top12ProductsNew: getNewArrayBySize(array, 0, this.state.productsSize)
    });
    // console.log(this.state.top12ProductsNew);
  }

  componentDidMount() {

    let products = sortDescreaseProductsBySaleoff(this.props.store.products);
    this.setState({
      top3ProductsSaleoff: getNewArrayBySize(products, 0, 3)
    });

    let productsSortDescreaseProductsByTimestamp = sortDescreaseProductsByTimestamp(
      this.props.store.products
    );
    this.setState({
        top12ProductsNew: getNewArrayBySize(productsSortDescreaseProductsByTimestamp, 0, this.state.productsSize)
      });
  }

  render() {
    // console.log(this.props.store.products);
    if (this.props.store) {
      return (
        <div className="StoreProducts">
          {/* section */}
          <div className="section">
            {/* container */}
            <div className="container">
              {/* row */}
              <div className="row">
                {/* ASIDE */}
                <div id="aside" className="col-md-3">
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Bộ lọc:</h3>
                    <ul className="filter-list">
                      <li>
                        <span className="text-uppercase">Màu sắc:</span>
                      </li>
                    </ul>
                    <ul className="filter-list">
                      <li>
                        <span className="text-uppercase">Kích thước:</span>
                      </li>
                    </ul>
                    <ul className="filter-list">
                      <li>
                        <span className="text-uppercase">Giá bán:</span>
                      </li>
                    </ul>
                    <ul className="filter-list">
                      <li>
                        <span className="text-uppercase">Thương hiệu:</span>
                      </li>
                    </ul>
                    <button className="primary-btn">Đặt lại</button>
                  </div>
                  {/* /aside widget */}
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Lọc giá bán</h3>
                    <div
                      id="price-slider"
                      className="noUi-target noUi-ltr noUi-horizontal"
                    >
                      <div className="noUi-base">
                        <div className="noUi-origin noUi-origin-custom">
                          <div
                            className="noUi-handle noUi-handle-lower noUi-handle-lower-custom"
                            data-handle="0"
                            tabIndex="0"
                            role="slider"
                            aria-orientation="horizontal"
                            aria-valuemin="0.0"
                            aria-valuemax="71.4"
                            aria-valuenow="0.0"
                            aria-valuetext="1.00$"
                          >
                            <div className="noUi-tooltip">1.00đ</div>
                          </div>
                        </div>
                        <div className="noUi-connect noUi-connect-custom"></div>
                        <div className="noUi-origin noUi-origin-custom-2">
                          <div
                            className="noUi-handle noUi-handle-upper noUi-handle-upper-custom"
                            data-handle="1"
                            tabIndex="0"
                            role="slider"
                            aria-orientation="horizontal"
                            aria-valuemin="0.0"
                            aria-valuemax="100.0"
                            aria-valuenow="71.4"
                            aria-valuetext="713.86$"
                          >
                            <div className="noUi-tooltip">713.86đ</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* aside widget */}
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Lọc màu sắc</h3>
                  </div>
                  {/* /aside widget */}
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Lọc kích thước</h3>
                  </div>
                  {/* /aside widget */}
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Lọc thương hiệu</h3>
                  </div>
                  {/* /aside widget */}
                  {/* aside widget */}
                  <div className="aside">
                    <h3 className="aside-title">Top khuyến mãi</h3>
                    {/* widget product */}
                    {this.state.top3ProductsSaleoff.map((product, i) => (
                        <ProductSaleOff
                          key={i}
                          store={this.props.store}
                          product={product}
                        />
                      ))}
                    {/* /widget product */}
                  </div>
                  {/* /aside widget */}
                </div>
                {/* /ASIDE */}
                {/* MAIN */}
                <div id="main" className="col-md-9">
                  {/* store top filter */}
                  <div className="store-filter clearfix">
                    <div className="pull-left">
                      <div className="row-filter">
                        <Link to="#">
                          <i className="fa fa-th-large" />
                        </Link>
                        <Link to="#" className="active">
                          <i className="fa fa-bars" />
                        </Link>
                      </div>
                      <div className="sort-filter">
                        <span className="text-uppercase">Sắp xếp:</span>
                        <select
                          className="input"
                          onChange={this.onSortProductsChange}
                        >
                          <option value={0}>Tất cả</option>
                          <option value={1}>Mới nhất</option>
                          <option value={2}>Giảm giá nhiều</option>
                          <option value={3}>Giá tăng dần</option>
                          <option value={4}>Giá giảm dần</option>
                        </select>
                      </div>
                    </div>
                    <div className="pull-right">
                      <div className="page-filter">
                        <span className="text-uppercase">Hiển thị:</span>
                        <select className="input">
                          <option value={0}>12</option>
                        </select>
                      </div>
                      <ul className="store-pages">
                        <li>
                          <span className="text-uppercase">Trang:</span>
                        </li>
                        <li className="active">1</li>
                        <li>
                          <Link to="#">2</Link>
                        </li>
                        <li>
                          <Link to="#">3</Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-caret-right" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /store top filter */}
                  {/* STORE */}
                  <div id="store">
                    {/* row */}
                    <div className="row">
                      {this.state.top12ProductsNew.map((product, i) => (
                          <Product
                            key={i}
                            store={this.props.store}
                            product={product}
                          />
                        ))}
                    </div>
                    {/* /row */}
                  </div>
                  {/* /STORE */}
                </div>
                {/* /MAIN */}
              </div>
              {/* /row */}
            </div>
            {/* /container */}
          </div>
          ;{/* /section */}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Products;
