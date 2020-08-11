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
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Card,
    CardHeader,
    CardImg
} from "reactstrap";
// import { Link } from "react-router-dom";
// core components
import Header from "components/user/components/Headers/Header.jsx";
import "./BuyStoresMore.css";
import { formatDate2 } from "../../../../utils/dateUtils";
import priceFormatUtil from "../../../../utils/priceFormat";
import { getUserLogged } from "../../../../services/user.service";
import MessageNotify from "../../../istore/MessageNotify";

const counts = [1, 2, 3, 5, 10];
let y1 = new Date(), y2 = new Date(), y3 = new Date(), y4 = new Date();
const timeLimiteds = [
    {
        label: "1 năm",
        money: 69000,
        start: new Date(),
        end: y1.setFullYear(y1.getFullYear() + 1)
    },
    {
        label: "2 năm",
        money: 115000,
        start: new Date(),
        end: y2.setFullYear(y2.getFullYear() + 2)
    },
    {
        label: "3 năm",
        money: 161000,
        start: new Date(),
        end: y3.setFullYear(y3.getFullYear() + 3)
    },
    {
        label: "5 năm",
        money: 230000,
        start: new Date(),
        end: y4.setFullYear(y4.getFullYear() + 5)
    }
];

class BuyStoresMore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputStoresCount: null,
            inputTimeLimited: null,
            inputMoney: null,

            messageErrorInputStoresCount: "",
            messageErrorInputTimeLimited: "",
            messageErrorInputMoney: "",

            updateResultMessage: "",
        }

        this.onStoresCountChange = this.onStoresCountChange.bind(this);
        this.onTimeLimitedChange = this.onTimeLimitedChange.bind(this);
        this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    }

    componentDidMount() {

    }

    onStoresCountChange(e) {
        if (e.target.value) {
            if (this.state.inputTimeLimited) {
                this.setState({
                    inputStoresCount: counts[e.target.value],
                    messageErrorInputStoresCount: "",
                    inputMoney: this.state.inputTimeLimited.money * counts[e.target.value]
                })
            }
            else {
                this.setState({
                    inputStoresCount: counts[e.target.value],
                    messageErrorInputStoresCount: "",
                    inputMoney: null
                })
            }
        }
        else {
            this.setState({
                inputStoresCount: null,
                messageErrorInputStoresCount: "Số lượng cửa hàng không được để trống",
                inputMoney: null
            })
        }
    }

    onTimeLimitedChange(e) {
        if (e.target.value) {
            if (this.state.inputStoresCount) {
                this.setState({
                    inputTimeLimited: timeLimiteds[e.target.value],
                    messageErrorInputTimeLimited: "",
                    inputMoney: timeLimiteds[e.target.value].money * this.state.inputStoresCount
                })
            }
            else {
                this.setState({
                    inputTimeLimited: timeLimiteds[e.target.value],
                    messageErrorInputTimeLimited: "",
                    inputMoney: null
                })
            }
        }
        else {
            this.setState({
                inputTimeLimited: null,
                messageErrorInputTimeLimited: "Thời gian không được để trống",
                inputMoney: null
            })
        }
    }

    onSubmitButtonClick() {
        if (!this.state.inputStoresCount) {
            this.setState({
                messageErrorInputStoresCount: "Số lượng cửa hàng không được để trống"
            })
        }
        if (!this.state.inputTimeLimited) {
            this.setState({
                messageErrorInputTimeLimited: "Thời gian không được để trống"
            })
        }
        if (this.state.inputStoresCount && this.state.inputTimeLimited
            && this.state.inputMoney) {
            getUserLogged(result => {
                result.user.maxStoresCountCreated = {
                    count: result.user.maxStoresCountCreated.count + this.state.inputStoresCount,
                    // timeLimited: formatDate(this.state.inputTimeLimited.end) + "T23:59:59.000Z"
                    timeLimited: new Date(this.state.inputTimeLimited.end)
                }

                fetch("/api/users/" + result.user._id,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            maxStoresCountCreated: result.user.maxStoresCountCreated,
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => res.json())
                    .then(userUpdate => {

                        // console.log(userUpdate);

                        this.setState({
                            updateResultMessage: "Đăng ký gói cửa hàng thành công!"
                        })

                        setTimeout(() => {
                            window.location = "stores-manage";
                        }, 2000);
                    });
            })
        }
    }

    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="buy-more-stores" fluid={true}>
                    <Row className="mt-5">
                        <Col>
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row>
                                        <Col>
                                            <h3 id="user-info" className="mb-0">MUA GÓI CỬA HÀNG</h3>
                                        </Col>
                                    </Row>
                                    <hr className="my-4" />
                                    <Row>
                                        <Col lg="6">
                                            <Form>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="stores-count"
                                                            >
                                                                Số lượng cửa hàng
                                                                </label>
                                                            <Input type="select" id="stores-count" onChange={this.onStoresCountChange} required={true}>
                                                                <option value="">Số lượng</option>
                                                                {
                                                                    counts.map((count, key) => (
                                                                        <option key={key} value={key}>{count}</option>
                                                                    ))
                                                                }
                                                            </Input>
                                                            <label className={"message " + (this.state.messageErrorInputStoresCount ? "error" : "ok")}>
                                                                {this.state.messageErrorInputStoresCount}
                                                            </label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="time-limited"
                                                            >
                                                                Thời gian
                                                                </label>
                                                            <Input type="select" id="time-limited" onChange={this.onTimeLimitedChange} required={true}>
                                                                <option value="">Thời gian</option>
                                                                {
                                                                    timeLimiteds.map((timeLimited, key) => (
                                                                        <option key={key} value={key}>{timeLimited.label}</option>
                                                                    ))
                                                                }
                                                            </Input>
                                                            <label className={"message " + (this.state.messageErrorInputTimeLimited ? "error" : "ok")}>
                                                                {this.state.messageErrorInputTimeLimited}
                                                            </label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="money"
                                                            >
                                                                Thành tiền (VND)
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="money"
                                                                placeholder={"Thành tiền: " + priceFormatUtil(timeLimiteds[0].money)
                                                                    + " VND (1 cửa hàng/năm)"}
                                                                type="text"
                                                                required={true}
                                                                readOnly={true}
                                                                defaultValue={this.state.inputMoney && priceFormatUtil(this.state.inputMoney)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                        <Col lg="6">
                                            <Card className="card-custom">
                                                <CardImg variant="top" src="../../resources/img/top-10-cong-thanh-toan-online-cho-website.jpg" />
                                                <CardHeader>
                                                    <h3>THÔNG TIN DỊCH VỤ</h3>
                                                    <div>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Số lượng cửa hàng</td>
                                                                    <th>{this.state.inputStoresCount}</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Thời gian</td>
                                                                    <th>{this.state.inputTimeLimited && this.state.inputTimeLimited.label}</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Từ</td>
                                                                    <th>{this.state.inputTimeLimited && formatDate2(this.state.inputTimeLimited.start)}</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Đến</td>
                                                                    <th>{this.state.inputTimeLimited && formatDate2(this.state.inputTimeLimited.end)}</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Tổng thanh toán (VND)</td>
                                                                    <th>{this.state.inputMoney && priceFormatUtil(this.state.inputMoney)}</th>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CardHeader>
                                                <Button type="button" color="warning"
                                                    onClick={this.onSubmitButtonClick}
                                                    style={{ "width": "96%", "margin": "2%" }}>THANH TOÁN NGAY</Button>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        </Col>
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                    <MessageNotify message={this.state.updateResultMessage} />
                </Container>
                {/* Page content */}
            </>
        );
    }
}

export default BuyStoresMore;
