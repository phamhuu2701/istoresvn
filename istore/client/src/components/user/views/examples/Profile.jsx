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
import UserHeader from "components/user/components/Headers/UserHeader.jsx";
import formatDate from "../../../../utils/dateUtils";
import { getStoresByIdUser } from "../../../../services/user.service";
import "./Profile.css";
import MessageNotify from "../../../istore/MessageNotify";
import { Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            stores: [],
            inputFirstname: {
                errorMessage: "",
                value: props.user.fullname.firstname
            },
            inputLastname: {
                errorMessage: "",
                value: props.user.fullname.lastname
            },
            inputGender: {
                errorMessage: "",
                value: props.user.gender
            },
            inputBirthday: {
                errorMessage: "",
                value: props.user.birthday
            },
            inputAddress: {
                errorMessage: "",
                value: props.user.address
            },
            inputAbout: {
                errorMessage: "",
                value: props.user.about
            },
            display: 'hidden',
            updateResultMessage: null
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onRadioGenderChange = this.onRadioGenderChange.bind(this);
        this.onUpdateSubmitClick = this.onUpdateSubmitClick.bind(this);
        this.previewFile = this.previewFile.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
    }

    componentDidMount() {
        this.setState({
            stores: getStoresByIdUser(this, this.props.user._id)
        })
    }

    onInputChange(e) {
        if (e.target.id === "input-first-name") {
            if (e.target.value.trim() === "") {
                this.setState({
                    inputFirstname: {
                        errorMessage: "Tên không được để trống!",
                        value: this.props.user.fullname.firstname
                    }
                })
            }
            else {
                this.setState({
                    inputFirstname: {
                        errorMessage: "",
                        value: e.target.value
                    }
                })
            }
        }
        if (e.target.id === "input-last-name") {
            if (e.target.value.trim() === "") {
                this.setState({
                    inputLastname: {
                        errorMessage: "Họ không được để trống!",
                        value: this.props.user.fullname.lastname
                    }
                })
            }
            else {
                this.setState({
                    inputLastname: {
                        errorMessage: "",
                        value: e.target.value
                    }
                })
            }
        }
        if (e.target.id === "input-birthday") {
            this.setState({
                inputBirthday: {
                    errorMessage: "",
                    value: e.target.value
                }
            })
        }
        if (e.target.id === "input-address") {
            this.setState({
                inputAddress: {
                    errorMessage: "",
                    value: e.target.value
                }
            })
        }
        if (e.target.id === "input-about") {
            this.setState({
                inputAbout: {
                    errorMessage: "",
                    value: e.target.value
                }
            })
        }
    }

    onRadioGenderChange(e) {
        this.setState({
            inputGender: {
                errorMessage: "",
                value: (e.target.value === "true" ? true : false)
            }
        })
    }

    onUpdateSubmitClick() {
        fetch("/api/users/" + this.props.user._id,
            {
                method: "PUT",
                body: JSON.stringify({
                    phone: document.querySelector('#input-phone').value,
                    fullname: {
                        firstname: this.state.inputFirstname.value,
                        lastname: this.state.inputLastname.value
                    },
                    gender: this.state.inputGender.value,
                    birthday: this.state.inputBirthday.value,
                    address: this.state.inputAddress.value,
                    about: this.state.inputAbout.value,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(userUpdate => {
                // console.log("Update success!");
                this.setState({
                    user: userUpdate,
                    updateResultMessage: "Cập nhập thông tin thành công!",
                    inputFirstname: {
                        errorMessage: "",
                        value: userUpdate.fullname.firstname
                    },
                    inputLastname: {
                        errorMessage: "",
                        value: userUpdate.fullname.lastname
                    }
                })
                document.querySelectorAll('.media')[2].children[0].textContent = userUpdate.fullname.lastname + ' ' + userUpdate.fullname.firstname;
            });
    }

    previewFile(e, cancle = false) {
        var preview = document.querySelector('img.preview'); //selects the query named img
        if (cancle) {
            preview.src = this.state.user.avatars[0];
            this.setState({
                display: 'hidden'
            })
        } else {
            var file = document.querySelector('input[type=file]').files[0]; //sames as here
            var reader = new FileReader();
            reader.onloadend = function () {
                preview.src = reader.result;
            }
            if (file) {
                this.setState({
                    display: ''
                })
                reader.readAsDataURL(file); //reads the data as a URL
            } else {
                //preview.src = "";
            }
        }
    }

    updateAvatar(e) {
        e.preventDefault();
        const file = document.querySelector('input[type=file]').files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/users/updateAvatar', {
            method: 'PUT',
            body: formData
        })
            .then(result => {
                return result.json()
            })
            .then(path => {
                const user = this.state.user;
                user.avatars[0] = path;
                this.setState({
                    user: user
                })
                this.setState({
                    display: 'hidden'
                })
                document.querySelector('.avatarHeader').src = path;
                alert('Đã cập nhật avatar!');

                // 
            })
            .catch(err => console.log(err))
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
                                <Form onSubmit={this.updateAvatar}>
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <img
                                                    alt="..."
                                                    className="rounded-circle preview"
                                                    src={this.state.user.avatars[0]}
                                                />
                                                <input className="change-avatar" type="file" onChange={this.previewFile} accept="image/*" alt="Change avatar" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                        <div className={"d-flex justify-content-between " + this.state.display}>
                                            <Button
                                                type="reset"
                                                onClick={() => { this.previewFile(this, true) }}
                                                className="mr-4"
                                                color="info"
                                                size="sm"
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="float-right"
                                                color="success"
                                                size="sm"
                                            >
                                                Cập nhật
                                            </Button>
                                        </div>
                                    </CardHeader>
                                </Form>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <span className="heading">{this.state.stores && this.state.stores.length}</span>
                                                    <span className="description">
                                                        <Link to="/user/stores-manage">Cửa hàng</Link>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Đánh giá</span>
                                                </div>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Theo dõi</span>
                                                </div>
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
                                        <a href="/#">
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
                                                            onChange={this.onInputChange}
                                                        />
                                                        <span className={"message " + ((this.state.inputFirstname.errorMessage === "") ? "ok" : "error")}>
                                                            {this.state.inputFirstname.errorMessage}
                                                        </span>
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
                                                            onChange={this.onInputChange}
                                                        />
                                                        <span className={"message " + ((this.state.inputLastname.errorMessage === "") ? "ok" : "error")}>
                                                            {this.state.inputLastname.errorMessage}
                                                        </span>
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
                                                            readOnly={typeof this.state.user.phone === 'string'}
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
                                                            placeholder="user@gmail.com"
                                                            type="email"
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
                                                            onChange={this.onInputChange}
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
                                                            onChange={this.onInputChange}
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
                                                    id="input-about"
                                                    rows="4"
                                                    type="textarea"
                                                    defaultValue={this.state.user.about}
                                                    onChange={this.onInputChange}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="pl-lg-4">
                                            <Button onClick={this.onUpdateSubmitClick} type="button"
                                                className="btn" style={{ float: "right" }} color="primary">CẬP NHẬT</Button>
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
