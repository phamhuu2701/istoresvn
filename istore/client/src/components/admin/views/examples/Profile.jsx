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
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Label
} from "reactstrap";
// core components
import UserHeader from "components/admin/components/Headers/UserHeader.jsx";
import formatDate from "../../../../utils/dateUtils";
import MessageNotify from "../../../istore/MessageNotify";
import { getEmployeeByUser } from "../../../../services/employee.service";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            employee: null
        }
    }

    componentDidMount(){
        getEmployeeByUser(this.props.user._id, employee => {
            this.setState({
                employee: employee
            })
        })
    }

    render() {
        return (
            <>
                <UserHeader user={this.state.user} />
                {/* Page content */}
                <Container className="mt--7 user-profile" fluid={true}>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={this.state.user.avatars[0]}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className="mr-4"
                                            color="info"
                                            href="#pablo"
                                            size="sm"
                                        >
                                            Kết nối
                                        </Button>
                                        <Button
                                            className="float-right"
                                            color="success"
                                            href="#pablo"
                                            size="sm"
                                        >
                                            Tin nhắn
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3 style={{ "textTransform": "uppercase" }}>
                                            {(this.state.user.fullname.lastname + " " + this.state.user.fullname.firstname)}
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="fa fa-phone text-gray"></i>{" "}
                                            {this.state.user.phone}
                                        </div>
                                        <div className="h5 font-weight-300">
                                            <i className="fa fa-envelope text-gray"></i>{" "}
                                            {this.state.user.email}
                                        </div>
                                        <div className="h5 font-weight-300">
                                            <i className="fa fa-map-marker text-gray"></i>{" "}
                                            {this.state.user.address}
                                        </div>
                                        <hr className="my-4" />
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            Xem thêm
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 id="user-info" className="mb-0">Thông tin tài khoản</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                Cập nhật
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin cá nhân
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            Tên
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.user.fullname.firstname}
                                                            id="input-first-name"
                                                            placeholder="Tên"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Họ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.user.fullname.lastname}
                                                            id="input-last-name"
                                                            placeholder="Họ"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-phone"
                                                        >
                                                            Số điện thoại
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.user.phone}
                                                            id="input-phone"
                                                            placeholder="Số điện thoại"
                                                            type="tel"
                                                            maxLength={10}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.user.email}
                                                            id="input-email"
                                                            placeholder="istore@gmail.com"
                                                            type="email"
                                                            maxLength={30}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        Giới tính
                                                    </label>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={true}
                                                                onChange={this.onRadioGenderChange}
                                                                defaultChecked={this.state.user.gender ? true : false} />{' '}
                                                            Nam
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={false}
                                                                onChange={this.onRadioGenderChange}
                                                                defaultChecked={this.state.user.gender ? false : true} />{' '}
                                                            Nữ
                                                        </Label>
                                                    </FormGroup>
                                                    <br />
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-birthday"
                                                        >
                                                            Ngày sinh
                                                        </label>
                                                        <Input
                                                            type="date"
                                                            id="input-birthday"
                                                            placeholder="Ngày sinh"
                                                            defaultValue={formatDate(this.state.user.birthday)}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Chức vụ công việc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-department"
                                                        >
                                                            Phòng ban
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employee && this.state.employee.department.name}
                                                            id="input-department"
                                                            placeholder="Phòng ban"
                                                            type="text"
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-salary"
                                                        >
                                                            Lương (VND)
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employee && this.state.employee.salary}
                                                            id="input-salary"
                                                            placeholder="Lương (VND)"
                                                            type="number"
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-timeStart"
                                                        >
                                                            Ngày bắt đầu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={formatDate(this.state.employee && this.state.employee.timeStart)}
                                                            id="input-timeStart"
                                                            placeholder="Ngày bắt đầu"
                                                            type="date"
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin liên lạc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Địa chỉ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.user.address}
                                                            id="input-address"
                                                            placeholder="Địa chỉ"
                                                            type="text"
                                                            maxLength={100}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">Giới thiệu</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>Giới thiệu</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Hãy viết gì đó về bạn"
                                                    rows="4"
                                                    type="textarea"
                                                    id="input-about"
                                                    defaultValue={this.state.user.about}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="pl-lg-4">
                                            <Button type="button" className="btn" style={{ float: "right" }} color="primary">CẬP NHẬT</Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <MessageNotify message={this.state.updateResultMessage} />
                </Container>
            </>
        );
    }
}

export default Profile;
