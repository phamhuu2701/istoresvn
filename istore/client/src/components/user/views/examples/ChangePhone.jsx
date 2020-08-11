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
import React from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
} from 'reactstrap';

class ChangePhone extends React.Component {
    constructor(props) {
        super(props);
        this.phoneRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            user: {
                id: '',
                phone: ''
            }
        };
        this.updatePhone = this.updatePhone.bind(this);
    }

    UNSAFE_componentWillMount() {
        fetch('/api/login', {
            method: 'GET'
        })
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                }
            })
            .then(res => {
                this.setState({
                    id: res.user._id,
                    phone: res.user.phone,
                    social: !++res.user.mailVerifyToken
                });
                if (res.user.phone) {
                    // alert('Bạn không có quyền thực hiện chức năng này!');
                    // document.location.href = '/user/profile';
                } else {
                    // Render enter the new number phone
                }
            })
            .catch(err => console.log(err));
    }

    updatePhone(e) {
        e.preventDefault();
        const user = {
            phone: this.phoneRef.current.value,
            password: this.passwordRef.current.value
        };
        if (user.phone.length !== 10 || !user.phone.startsWith('0')) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }
        fetch('/api/users/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(result => {
                if (result.status === 200) {
                    alert('Đã cập nhật số điện thoại');
                    document.location.href = '/user/profile';
                } else {
                    return alert('Mật khẩu không đúng!');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Col lg='5' md='7'>
                    <Card className='bg-secondary shadow border-0'>
                        <CardBody className='px-lg-5 py-lg-5'>
                            <div className='text-center text-muted mb-4'>
                                <h1 style={{ color: '#777' }}>
                                    Bổ sung số điện thoại
                                </h1>
                            </div>
                            <hr />
                            <Form role='form' onSubmit={this.updatePhone}>
                                <FormGroup className='mb-3'>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-mobile-button' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            innerRef={this.phoneRef}
                                            placeholder='Nhập số điện thoại'
                                            defaultValue={this.state.phone}
                                            type='tel'
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                {/* <FormGroup className='mb-3'>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-mobile-button' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder='Số điện thoại mới'
                                            type='tel'
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormGroup> */}
                                <FormGroup>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            innerRef={this.passwordRef}
                                            placeholder='Nhập mật khẩu'
                                            type='password'
                                            required={true}
                                            defaultValue={
                                                this.state.social
                                                    ? 'social'
                                                    : ''
                                            }
                                            readOnly={this.state.social}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className='text-center'>
                                    <Button
                                        className='my-4'
                                        color='primary'
                                        type='submit'
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    {/* <Row className="mt-3">
                        <Col xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Quên mật khẩu?</small>
                            </a>
                        </Col>
                        <Col className="text-right" xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Tạo tài khoản mới</small>
                            </a>
                        </Col>
                    </Row> */}
                </Col>
            </>
        );
    }
}

export default ChangePhone;
