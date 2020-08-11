import React, { Component } from 'react';
import { Form, Button, Image, Modal, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';

import Facebook from './Facebook';
import Google from './Google';

import {
    LoginByLocalService,
    SignUpByLocalService,
    LogOutService,
    ValidateInputService,
    ForgotPasswordService
} from '../../services/user.service';

import './DropdownUser.css';

export class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: props.emailValue
        };
        this.onEnterForgotPassword = this.onEnterForgotPassword.bind(this);
        this.changeEmailForgotPassword = this.changeEmailForgotPassword.bind(
            this
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            emailValue: nextProps.emailValue
        });
    }

    onEnterForgotPassword(e) {
        if (e.which === 13 || e.which === 10) {
            this.props.forgotPassword();
        }
    }

    changeEmailForgotPassword() {
        this.props.setDefaultEmailValue();
    }

    render() {
        if (this.state.emailValue) {
            return (
                <div>
                    <h5 className='text-success'>
                        Email:{' '}
                        <a
                            href='https://mail.google.com'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {this.state.emailValue}
                        </a>{' '}
                        <span
                            className='cancelForgotPassword'
                            onClick={this.changeEmailForgotPassword}
                        >
                            Thay đổi
                        </span>
                    </h5>
                    <div className='dropdown-user-body-content'>
                        <Form.Control
                            type='text'
                            name='token'
                            placeholder='Nhập Token'
                            className='field-filter-form-input-search'
                            ref={this.props.forgotPassword_TokenRef}
                            required
                        />
                    </div>
                    <div className='dropdown-user-body-content'>
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Nhập mật khẩu mới'
                            className='field-filter-form-input-search'
                            ref={this.props.forgotPassword_PasswordRef}
                            required
                        />
                    </div>
                    <div className='dropdown-user-body-content'>
                        <Form.Control
                            type='password'
                            name='passwordConfirm'
                            placeholder='Nhập lại mật khẩu mới'
                            className='field-filter-form-input-search'
                            ref={this.props.forgotPassword_rePasswordRef}
                            required
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='Nhập Email'
                    className='field-filter-form-input-search'
                    ref={this.props.forgotPassword_EmailRef}
                    required
                    onKeyPress={this.onEnterForgotPassword}
                />
            );
        }
    }
}

class SignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: props.sign,
            feedback: '',
            feedbackContent: '',
            checkFirstname: '',
            checkLastname: '',
            checkEmail: '',
            checkPhone: '',
            checkPassword: '',
            checkPasswordConfirm: '',
            showLoading: '',
            showModal: false,
            emailValue: '',
            forgotPasswordNotify: 'Vui lòng nhập Email để lấy lại mật khẩu!!',
            confirmForgotPasswordValue: 'Xác nhận',
            errorForgotPassword: '',
            errorLogin: ''
        };
        this.forgotPassword_EmailRef = React.createRef();
        this.forgotPassword_TokenRef = React.createRef();
        this.forgotPassword_PasswordRef = React.createRef();
        this.forgotPassword_rePasswordRef = React.createRef();

        this.signInSubmit = this.signInSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.setDefaultEmailValue = this.setDefaultEmailValue.bind(this);
    }

    UNSAFE_componentWillMount() {
        Cookies.set('1P_JAR', 'Strick', { sameSite: 'none', secure: true });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            sign: nextProps.sign
        });
    }

    signInSubmit(e) {
        LoginByLocalService(e, this.props.loginHandler, this);
    }

    signUpSubmit(e) {
        SignUpByLocalService(e, this);
    }

    validateInput(e) {
        ValidateInputService(e.target.name, e.target.value, this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    setDefaultEmailValue(show = true) {
        this.setState({
            forgotPasswordNotify: 'Vui lòng nhập Email để lấy lại mật khẩu!!',
            confirmForgotPasswordValue: 'Xác nhận',
            emailValue: '',
            showModal: show
        });
    }

    async forgotPassword() {
        ForgotPasswordService(this);
    }

    render() {
        if (this.state.sign === 'in') {
            return (
                <div>
                    <center className='text-danger'>
                        <span className='login-error'>
                            {this.state.errorLogin}
                        </span>
                    </center>
                    <Form id='signInForm' onSubmit={this.signInSubmit}>
                        <div className='dropdown-user-body-content sign-in'>
                            <Form.Control
                                type='text'
                                name='email'
                                placeholder='Email'
                                className='field-filter-form-input-search'
                                required
                            />
                        </div>
                        <div className='dropdown-user-body-content sign-in'>
                            <Form.Control
                                type='password'
                                name='password'
                                placeholder='Mật khẩu'
                                className='field-filter-form-input-search'
                                required
                            />
                        </div>
                        <div className='dropdown-user-body-content text-center'>
                            <Button variant='success' type='submit'>
                                Đăng nhập
                            </Button>
                        </div>
                        <div className='dropdown-user-body-content'>
                            <span
                                className='forgot-password'
                                onClick={this.open}
                            >
                                Quên mật khẩu
                            </span>
                        </div>
                        <hr className='dropdown-user-body-content-divide' />
                        <div className='dropdown-user-body-content sign-in text-center'>
                            <div className='ui buttons'>
                                <Facebook
                                    loginHandler={user =>
                                        this.props.loginHandler(user)
                                    }
                                />
                                <div className='or'></div>
                                <Google
                                    loginHandler={user =>
                                        this.props.loginHandler(user)
                                    }
                                />
                            </div>
                        </div>
                    </Form>

                    {/*Forgot password modal*/}
                    <Modal
                        show={this.state.showModal}
                        onHide={this.close}
                        size='sm'
                        aria-labelledby='contained-modal-title-vcenter'
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.state.forgotPasswordNotify}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div
                                className={'loading ' + this.state.showLoading}
                            >
                                Đang kiểm tra email
                                <Spinner
                                    animation='grow'
                                    variant='success'
                                    size='sm'
                                />
                                <Spinner
                                    animation='grow'
                                    variant='warning'
                                    size='sm'
                                />
                                <Spinner
                                    animation='grow'
                                    variant='success'
                                    size='sm'
                                />
                            </div>
                            <p className='text-danger text-center'>
                                {this.state.errorForgotPassword}
                            </p>
                            <ForgotPasswordForm
                                emailValue={this.state.emailValue}
                                forgotPassword={this.forgotPassword}
                                setDefaultEmailValue={this.setDefaultEmailValue}
                                forgotPassword_EmailRef={
                                    this.forgotPassword_EmailRef
                                }
                                forgotPassword_TokenRef={
                                    this.forgotPassword_TokenRef
                                }
                                forgotPassword_PasswordRef={
                                    this.forgotPassword_PasswordRef
                                }
                                forgotPassword_rePasswordRef={
                                    this.forgotPassword_rePasswordRef
                                }
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.forgotPassword}>
                                {this.state.confirmForgotPasswordValue}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else if (this.state.sign === 'up') {
            return (
                <Form id='signUpForm' onSubmit={this.signUpSubmit}>
                    <div className={'feedback ' + this.state.feedback}>
                        {this.state.feedbackContent}
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='text'
                            name='firstname'
                            placeholder='Tên'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkFirstname
                            }
                            required
                            onBlur={this.validateInput}
                        />
                        <div className='valid-feedback'>Good</div>
                        <div className='invalid-feedback'>Fail</div>
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='text'
                            name='lastname'
                            placeholder='Họ'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkLastname
                            }
                            required
                            onBlur={this.validateInput}
                        />
                        <div className='valid-feedback'>Good</div>
                        <div className='invalid-feedback'>Fail</div>
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='email'
                            name='email'
                            placeholder='Email'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkEmail
                            }
                            required
                            onBlur={this.validateInput}
                        />
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='phone'
                            name='phone'
                            placeholder='Số điện thoại'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkPhone
                            }
                            minLength='10'
                            maxLength='10'
                            required
                            onBlur={this.validateInput}
                        />
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Mật khẩu'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkPassword
                            }
                            required
                            onBlur={this.validateInput}
                        />
                    </div>
                    <div className='dropdown-user-body-content sign-up'>
                        <Form.Control
                            type='password'
                            name='password_confirm'
                            placeholder='Nhập lại mật khẩu'
                            className={
                                'field-filter-form-input-search ' +
                                this.state.checkPasswordConfirm
                            }
                            required
                            onBlur={this.validateInput}
                        />
                    </div>
                    <div className='dropdown-user-body-content text-center'>
                        <Button variant='primary' type='submit'>
                            Đăng ký
                        </Button>
                    </div>
                </Form>
            );
        } else {
            return <div></div>;
        }
    }
}

export default class DropdownUser extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false,
            sign: '',
            emailValue: ''
        };
        this.onClicked = this.onClicked.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.wrapperRef = React.createRef();
    }

    onClicked() {
        let x = document.getElementById('dropdown-user-body');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }

    signIn() {
        document.querySelector('body').style.overflowY = 'hidden';
        this.setState({
            sign: 'in'
        });
    }

    signUp() {
        this.setState({
            sign: 'up'
        });
    }

    UNSAFE_componentWillMount() {
        // Check user logged in
        fetch('/api/login')
            .then(res => {
                return res.json();
            })
            .then(result => {
                this.setState({
                    isLogged: result.isLogged,
                    user: result.user,
                    sign: ''
                });
                this.props.logInToggle(
                    result.isLogged,
                    result.isLogged ? result.user.interests.length : 0
                );
            })
            .catch(err => {
                console.log('Lỗi rồi! Lỗi gì thì không biết!');
            });
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {}

    // Logged in successfully
    loginHandler(user) {
        this.setState({
            isLogged: true,
            user: user,
            sign: ''
        });
        document.getElementById('dropdown-user-body').style.display = 'none';
        this.props.logInToggle(true, user.interests.length);
    }

    logoutHandler() {
        LogOutService(this);
    }

    handleClick = event => {
        const { target } = event;
        if (!this.wrapperRef.current.contains(target)) {
            document.getElementById('dropdown-user-body').style.display =
                'none';
        }
    };

    render() {
        if (this.state.isLogged === true) {
            return (
                <div className='dropdown-user' ref={this.wrapperRef}>
                    <Image
                        className='dropdown-user-image'
                        src={this.state.user.avatars[0]}
                        width={50}
                        height={50}
                        roundedCircle
                        onClick={this.onClicked}
                    />
                    <div className='dropdown-user-body' id='dropdown-user-body'>
                        <div className='dropdown-user-body-sub'></div>
                        <div className='dropdown-user-body-main'>
                            <a
                                href='/user/profile'
                                className='dropdown-user-body-content-link'
                            >
                                <div className='dropdown-user-body-content'>
                                    <img
                                        className='dropdown-user-body-content-imgage'
                                        alt=''
                                        src='./resources/icons/user.svg'
                                    ></img>
                                    <span className='dropdown-user-body-content-title'>
                                        {this.state.user.fullname.firstname +
                                            ' ' +
                                            this.state.user.fullname.lastname}
                                    </span>
                                </div>
                            </a>
                            <hr className='dropdown-user-body-content-divide' />
                            <a
                                href='/user/stores-manage'
                                className='dropdown-user-body-content-link'
                            >
                                <div className='dropdown-user-body-content'>
                                    <img
                                        className='dropdown-user-body-content-imgage'
                                        alt=''
                                        src='./resources/icons/list.svg'
                                    ></img>
                                    <span className='dropdown-user-body-content-title'>
                                        Quản lý cửa hàng
                                    </span>
                                </div>
                            </a>
                            <hr className='dropdown-user-body-content-divide' />
                            <a
                                href='/#'
                                className='dropdown-user-body-content-link'
                                onClick={this.logoutHandler}
                            >
                                <div className='dropdown-user-body-content'>
                                    <img
                                        className='dropdown-user-body-content-imgage'
                                        alt=''
                                        src='./resources/icons/logout.svg'
                                    ></img>
                                    <span className='dropdown-user-body-content-title'>
                                        Thoát
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='dropdown-user' ref={this.wrapperRef}>
                    <Image
                        className='dropdown-user-image'
                        src='./resources/icons/user.svg'
                        width={40}
                        height={40}
                        roundedCircle
                        onClick={this.onClicked}
                    />
                    <div className='dropdown-user-body' id='dropdown-user-body'>
                        <div className='dropdown-user-body-sub'></div>
                        <div className='dropdown-user-body-main'>
                            <div className='dropdown-user-body-content'>
                                <div className='ui buttons'>
                                    <button
                                        className='ui button btn-success'
                                        onClick={this.signIn}
                                    >
                                        Đăng nhập
                                    </button>
                                    <div className='or'></div>
                                    <button
                                        className='ui button btn-primary'
                                        onClick={this.signUp}
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            </div>
                            <SignForm
                                sign={this.state.sign}
                                loginHandler={loginSign =>
                                    this.loginHandler(loginSign)
                                }
                                successSignUpHandler={
                                    this.props.successSignUpHandler
                                }
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}
