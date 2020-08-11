import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Footer.css";

class Footer extends Component {

    render() {
            return (
                <div className="StoreFooter">
                    {/* FOOTER */}
                    <div className="store-footer">
                        <div id="footer" className="section section-grey">
                            {/* container */}
                            <Container>
                                {/* row */}
                                <Row>
                                    {/* footer widget */}
                                    <Col md="3">
                                        <div className="footer" style={{"backgroundColor": "#F6F7F8"}}>
                                            {/* footer logo */}
                                            <div className="footer-logo">
                                                <Link className="logo" to={"/store/" + this.props.store.template + "/" + this.props.store._id}>
                                                    <img
                                                        src={this.props.store.logo}
                                                        alt=""
                                                    />
                                                </Link>
                                            </div>
                                            {/* /footer logo */}
                                            <div className="footer-store-info">
                                                <p>
                                                    <i className="fa fa-phone"></i>
                                                    <span>
                                                        <b>{this.props.store.phone}</b>
                                                    </span>
                                                </p>
                                                <p>
                                                    <i className="fa fa-envelope"></i>
                                                    <span className="footer-store-info-email">
                                                        {this.props.store.email}
                                                    </span>
                                                </p>
                                                <p>
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>
                                                        {this.props.store.houseNumber + ", " + this.props.store.street.name
                                                            + ", " + this.props.store.district.name + ", " + this.props.store.city.name}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                    {/* /footer widget */}
                                    {/* footer widget */}
                                    <Col md="3">
                                        <div className="footer" style={{"backgroundColor": "#F6F7F8"}}>
                                            <h3 className="footer-header">
                                                Tài khoản
                                            </h3>
                                            <ul className="list-links">
                                                <li>
                                                    <Link to="#">Tài khoản</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Ưa thích</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">So sánh</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Thanh toán</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Đăng nhập</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Đăng ký</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                    {/* /footer widget */}
                                    <div className="clearfix visible-sm visible-xs" />
                                    {/* footer widget */}
                                    <Col md="3">
                                        <div className="footer" style={{"backgroundColor": "#F6F7F8"}}>
                                            <h3 className="footer-header">
                                                Dịch vụ khách hàng
                                            </h3>
                                            <ul className="list-links">
                                                <li>
                                                    <Link to="#">Giới thiệu</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Mua &amp; Đổi hàng
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Giao hàng</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        Chính sách khách hàng
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                    {/* /footer widget */}
                                    {/* footer subscribe */}
                                    <Col md="3">
                                        <div className="footer" style={{"backgroundColor": "#F6F7F8"}}>
                                            <h3 className="footer-header">
                                                Đăng ký bản tin
                                            </h3>
                                            <p>
                                                Đăng ký nhận bản tin mới nhất về
                                                các chương trình khuyến mãi và
                                                sản phẩm mới.
                                            </p>
                                            <Form>
                                                <FormGroup>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Email"
                                                    />
                                                </FormGroup>
                                                <button className="primary-btn">
                                                    Đăng ký
                                                </button>
                                            </Form>
                                        </div>
                                    </Col>
                                    {/* /footer subscribe */}
                                </Row>
                                {/* /row */}
                            </Container>
                            {/* /container */}
                        </div>
                    </div>
                    {/* /FOOTER */}
                </div>
            );
    }
}

export default Footer;
