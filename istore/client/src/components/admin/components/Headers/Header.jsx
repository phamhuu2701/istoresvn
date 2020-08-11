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
import { getUsers } from "../../../../services/user.service";
import { getStores } from "../../../../services/store.service";
import { getProducts } from "../../../../services/product.service";
import { getSearchKeysCount } from "../../../../services/searchKey.service";

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            searchCount: 0,
            usersCount: 0,
            storesCount: 0,
            productsCount: 0
        }
    }

    componentDidMount(){
        getSearchKeysCount(count => {
            this.setState({
                searchCount: count
            })
        });
        getUsers(users => {
            this.setState({
                usersCount: users.length
            })
        });
        getStores(stores => {
            this.setState({
                storesCount: stores.length
            })
        });
        getProducts(products => {
            this.setState({
                productsCount: products.length
            })
        })
    }

    render() {
        return (
            <>
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
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
                                                        Lượt tìm kiếm
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {this.state.searchCount}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="fas fa-search" />
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
                                                        Người dùng
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {this.state.usersCount}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                        <i className="fas fa-user" />
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
                                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                        <i className="fas fa-home"></i>
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
                                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                        <i className="fas fa-box" />
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
