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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    getChart1Data
} from "components/user/variables/charts.jsx";

import Header from "components/user/components/Headers/Header.jsx";
import { getStoresByIdUser2, getProductsAllStoresByUser } from "../../../services/user.service";
import { getStoreViewsCount2 } from "../../../services/store.service";
import { sortDescreaseProductsByViewsCount } from "../../../utils/productUtils";
import { getViewsCountByTime } from "../../../services/product.service";
import priceFormatUtil from "../../../utils/priceFormat";
import { sortDescreseStoresByView, sortDescreseProductsByView } from "../../../utils/sortModel";
import { Link } from "react-router-dom";

class Index extends React.Component {
    state = {
        activeNav: 1,
        chartExample1Data: "data1",
        top10ProductsViewsCout: [],
        top10Stores: []
    };
    toggleNavs = (e, index) => {
        try {
            e.preventDefault();
        } catch (error) {
            // console.log(error);
        }
        this.setState({
            activeNav: index,
            chartExample1Data: "data" + index
            // this.state.chartExample1Data === "data1" ? "data2" : "data1"
        });
        let wow = () => {
            // console.log(this.state);
        };
        wow.bind(this);
        setTimeout(() => wow(), 1000);
        // this.chartReference.update();
    };
    componentWillMount() {
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }
    componentDidMount() {
        getProductsAllStoresByUser(this.props.user._id, products => {
            // console.log(products);

            // sắp xếp giảm dần lượt xem
            sortDescreaseProductsByViewsCount(products);
            sortDescreseProductsByView(products, products2 => {
                if (products2.length > 10) {
                    this.setState({
                        top10ProductsViewsCout: products2.splice(0, 10)
                    })
                }
                else {
                    this.setState({
                        top10ProductsViewsCout: products2
                    })
                }
            })
        })

        getStoresByIdUser2(this.props.user._id, stores => {
            sortDescreseStoresByView(stores, (stores2) => {
                if (stores.length > 10) {
                    this.setState({
                        top10Stores: stores2.splice(0, 10)
                    })
                }
                else {
                    this.setState({
                        top10Stores: stores2
                    })
                }
            })
        })

        getProductsAllStoresByUser(this.props.user._id, products => {
            let data1 = [];
            let data2 = [];
            let data3 = [];

            let currentDate = new Date();

            for (let i = 1; i <= 12; i++) {
                let viewsCountByMonth = getViewsCountByTime(products, currentDate.getFullYear(), i, 0, currentDate.getFullYear(), i, 31);
                data1.push(viewsCountByMonth);
            }
            for (let i = 1; i <= 12; i += 3) {
                let viewsCountByQuater = getViewsCountByTime(products, currentDate.getFullYear(), i, 0, currentDate.getFullYear(), i + 2, 31);
                data2.push(viewsCountByQuater);
            }
            for (let i = currentDate.getFullYear() - 3; i <= currentDate.getFullYear(); i++) {
                let viewsCountByYear = getViewsCountByTime(products, i, 1, 0, i, 12, 31);
                data3.push(viewsCountByYear);
            }


            getChart1Data(
                {
                    data1: data1,
                    data2: data2,
                    data3: data3
                }
            );

            this.toggleNavs(this, 1);
        })
    }
    render() {
        // console.log(this.state.top10ProductsViewsCout);
        return (
            <>
                <Header />
                {/* Page content */}
                <Container fluid={true}>
                    <Row className="mt-5">
                        <Col>
                            <Card className="bg-gradient-default shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Thống kê
                                            </h6>
                                            <h2 className="text-white mb-0">Lượt xem cửa hàng</h2>
                                        </div>
                                        <div className="col">
                                            <Nav className="justify-content-end" pills>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 1
                                                        })}
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 1)}
                                                    >
                                                        <span className="d-none d-md-block">Tháng</span>
                                                        <span className="d-md-none">M</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 2
                                                        })}
                                                        data-toggle="tab"
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 2)}
                                                    >
                                                        <span className="d-none d-md-block">Quý</span>
                                                        <span className="d-md-none">Q</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 3
                                                        })}
                                                        data-toggle="tab"
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 3)}
                                                    >
                                                        <span className="d-none d-md-block">Năm</span>
                                                        <span className="d-md-none">Y</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* Chart */}
                                    <div className="chart">
                                        <Line
                                            data={chartExample1[this.state.chartExample1Data]}
                                            options={chartExample1.options}
                                            getDatasetAtEvent={e => console.log(e)}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row className="mt-5">
                        <Col>
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                                                Thống kê
                                            </h6>
                                            <h2 className="mb-0">Total orders</h2>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart">
                                        <Bar
                                            data={chartExample2.data}
                                            options={chartExample2.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row> */}
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="6">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Top cửa hàng</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="stores-manage">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Xem tất cả
                                                </Button>
                                            </Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>#</th>
                                            <th>Tên cửa hàng</th>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>Sản phẩm</th>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>Lượt xem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.top10Stores.length > 0 &&
                                            this.state.top10Stores.map((store, key) => (
                                                <tr key={key}>
                                                    <td style={{ "textAlign": "center" }}>{key + 1}</td>
                                                    <th style={{ "textTransform": "uppercase" }}>
                                                        <a href={
                                                            store.website.hasWebsite ?
                                                                store.website.url :
                                                                "/store/" + store.template + "/" + store._id
                                                        } target="_blank" rel="noopener noreferrer">
                                                            {store.name.substring(0, 20)}
                                                        </a>
                                                    </th>
                                                    <td style={{ "textAlign": "center" }}>{store.products.length}</td>
                                                    <td style={{ "textAlign": "center" }}>{getStoreViewsCount2(store)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col className="mb-5 mb-xl-0" xl="6">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Top sản phẩm</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="stores-products-manage">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Xem tất cả
                                                </Button>
                                            </Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>#</th>
                                            <th style={{ "paddingLeft": "0", "paddingRight": "0" }}>Sản phẩm</th>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>Giá tiền</th>
                                            <th style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>Lượt xem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.top10ProductsViewsCout.length > 0 &&
                                            this.state.top10ProductsViewsCout.map((product, key) => (
                                                <tr key={key}>
                                                    <td style={{ "textAlign": "center" }}>{key + 1}</td>
                                                    <th style={{ "paddingLeft": "0", "paddingRight": "0", "textTransform": "uppercase" }}>
                                                        <Link to={
                                                                "/store/" +
                                                                product.store.template +
                                                                "/" +
                                                                product.store._id +
                                                                "/products/" +
                                                                product._id
                                                            }
                                                            target="_blank"
                                                        >
                                                            {product.name.substring(0, 20)}
                                                        </Link>
                                                    </th>
                                                    <td style={{ "textAlign": "right" }}>{priceFormatUtil(product.price * (100 - product.saleoff) / 100)}</td>
                                                    <td style={{ "textAlign": "center" }}>{product.viewsCount.length}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Index;
