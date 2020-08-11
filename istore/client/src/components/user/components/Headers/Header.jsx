/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { getUserLogged, getStoresByIdUser2, getAvgRatesStoresByUser } from "../../../../services/user.service";
import { getStoreViewsCount } from "../../../../services/store.service";

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {},
            storeViewsCount: 0,
            storesCount: 0,
            productsCount: 0,
            avgRateStoresCount: 0
        }
    }

    componentDidMount() {
        getUserLogged((session) => {
            this.setState({
                user: session.user
            });

            getStoresByIdUser2(session.user._id, (stores) => {
                if (stores.length > 0) {
                    let storeViewsCount = 0;
                    let productsCount = 0;
                    stores.map((store, key) => {

                        getStoreViewsCount(store, result => {
                            storeViewsCount += result;
                        })

                        productsCount += store.products.length;

                        return null;
                    })

                    this.setState({
                        storeViewsCount: storeViewsCount,
                        storesCount: stores.length,
                        productsCount: productsCount
                    })
                }

                getAvgRatesStoresByUser(session.user, result => {
                    this.setState({
                        avgRateStoresCount: result
                    })
                })
            })
        });
    }
    render() {
        return (
            <>
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 header-custom">
                    <Container fluid={true}>
                        <div className="header-body">
                            {/* Card stats */}
                            <Row>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Lượt xem
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {this.state.storeViewsCount}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="fas fa-chart-bar" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Cửa hàng
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {this.state.storesCount}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                        <i className="fas fa-chart-pie" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Sản phẩm
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {this.state.productsCount}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                        <i className="fas fa-cart-plus"></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Đánh giá
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {Math.round(this.state.avgRateStoresCount * 100) / 100}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                        <i className="fas fa-star-half-alt" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        );
    }
}

export default Header;
