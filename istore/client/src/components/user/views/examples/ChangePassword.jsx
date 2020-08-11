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
    Row,
    Col
} from 'reactstrap';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.updatePassword = this.updatePassword.bind(this);
    }

    updatePassword(e) {
        e.preventDefault();
        const password = document.querySelector('input[name="password"]').value;
        const newPassword = document.querySelector('input[name="new-password"]')
            .value;
        const renewPassword = document.querySelector(
            'input[name="renew-password"]'
        ).value;
        if (newPassword === renewPassword) {
            if (password === newPassword) {
                alert('Mật khẩu mới không được trùng mật khẩu cũ!');
            } else {
                const user = {
                    password: password,
                    newPassword: newPassword
                };
                fetch('/api/users/updatePassword', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(result => {
                        if (result.status === 200)
                            document.querySelector('form').reset();
                        return result.json();
                    })
                    .then(res => {
                        alert(res);
                    })
                    .catch(err => console.log(err));
            }
        } else {
            alert('Mật khẩu xác nhận không khớp!');
        }
    }
    render() {
        return (
            <>
                <Col lg='5' md='7'>
                    <Card className='bg-secondary shadow border-0'>
                        <CardBody className='px-lg-5 py-lg-5'>
                            <div className='text-center text-muted mb-4'>
                                <h1 style={{ color: '#777' }}>Đổi mật khẩu</h1>
                            </div>
                            <hr />
                            <Form role='form' onSubmit={this.updatePassword}>
                                <FormGroup className='mb-3'>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            name='password'
                                            placeholder='Mật khẩu hiện tại'
                                            type='password'
                                            minLength='3'
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className='mb-3'>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            name='new-password'
                                            placeholder='Mật khẩu mới mới'
                                            type='password'
                                            minLength='3'
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            name='renew-password'
                                            placeholder='Xác nhận mật khẩu mới'
                                            type='password'
                                            minLength='3'
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className='text-center'>
                                    <Button
                                        className='my-4'
                                        color='primary'
                                        type='submit'
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className='mt-3'>
                        <Col xs='6'>
                            <a
                                className='text-light'
                                href='#pablo'
                                onClick={e => e.preventDefault()}
                            >
                                <small>Quên mật khẩu?</small>
                            </a>
                        </Col>
                        <Col className='text-right' xs='6'>
                            <a
                                className='text-light'
                                href='#pablo'
                                onClick={e => e.preventDefault()}
                            >
                                <small>Tạo tài khoản mới</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

export default ChangePassword;
