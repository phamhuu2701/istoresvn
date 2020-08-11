import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-header">
                    <div className="footer-header-title">
                        <img alt="IStore" src="./resources/icons/logo.svg"></img>
                        <span>iStore</span>
                    </div>
                    <div className="footer-header-title-sub">
                        Website tìm kiếm cửa hàng theo sản phẩm mong muốn - Chất lượng.
                    </div>
                    <div className="footer-header-content">
                        Giúp bạn tìm kiếm cửa hàng một cách dễ dàng và nhanh chóng!
                    </div>
                    <div className="footer-header-icons">
                        <img alt="" src="./resources/icons/facebook.svg"></img>
                        <img alt="" src="./resources/icons/google.svg"></img>
                        <img alt="" src="./resources/icons/google-plus.svg"></img>
                        <img alt="" src="./resources/icons/youtube.svg"></img>
                        <img alt="" src="./resources/icons/zalo.svg"></img>
                    </div>
                </div>
                <div className="footer-body">
                    <Row>
                        <Col sm={6} md={3}>
                            <div className="footer-body-item">
                                <div className="footer-body-title">
                                    Liên kết
                                </div>
                                <div className="social-network">
                                    <img
                                        className="social-network-icon"
                                        alt=""
                                        src="./resources/icons/facebook.svg">
                                    </img>
                                    <span className="social-network-title">
                                        Facebook
                                    </span>
                                </div>
                                <div className="social-network">
                                    <img
                                        className="social-network-icon"
                                        alt=""
                                        src="./resources/icons/google-plus.svg"
                                    ></img>
                                    <span className="social-network-title">
                                        Google+
                                    </span>
                                </div>
                                <div className="social-network">
                                    <img
                                        className="social-network-icon"
                                        alt=""
                                        src="./resources/icons/youtube.svg"
                                    ></img>
                                    <span className="social-network-title">
                                        Youtube
                                    </span>
                                </div>
                                <div className="social-network">
                                    <img
                                        className="social-network-icon"
                                        alt=""
                                        src="./resources/icons/zalo.svg"
                                    ></img>
                                    <span className="social-network-title">
                                        Zalo
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className="footer-body-item">
                                <div className="footer-body-title">
                                    Hỗ trợ khách hàng
                                </div>
                                <div className="footer-body-content">
                                    Trung tâm trợ giúp
                                </div>
                                <div className="footer-body-content">
                                    An toàn mua bán
                                </div>
                                <div className="footer-body-content">
                                    Quy định cần biết
                                </div>
                                <div className="footer-body-content">
                                    Liên hệ hỗ trợ
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className="footer-body-item">
                                <div className="footer-body-title">
                                    Về chúng tôi
                                </div>
                                <div className="footer-body-content">
                                    Giới thiệu
                                </div>
                                <div className="footer-body-content">
                                    Quy định, điều khoản sử dụng
                                </div>
                                <div className="footer-body-content">
                                    Hướng dẫn
                                </div>
                                <div className="footer-body-content">
                                    Liên hệ
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className="footer-body-item">
                                <div className="footer-body-title">
                                    Thanh toán
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
