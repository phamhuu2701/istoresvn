import React, { Component } from "react";

import "./AdminLogin.css";
import AdminIndex from "./AdminIndex";
import { checkUserLogin, getUserLogged } from "../services/user.service";

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminIsLoggedIn: false,
            user: null,
            logginErrorMessagse: ""
        };
        this.adminLoginHandler = this.adminLoginHandler.bind(this);
    }

    UNSAFE_componentWillMount() {
        getUserLogged(result => {
            if (
                result.user &&
                result.isLogged &&
                result.user.authorization.name === "Admin"
            ) {
                this.setState({
                    adminIsLoggedIn: true,
                    user: result.user,
                    logginErrorMessagse: ""
                });
            }
            else {
                this.setState({
                    adminIsLoggedIn: false,
                    user: null,
                    logginErrorMessagse: ""
                });
            }
        });
    }

    adminLoginHandler(e) {
        e.preventDefault();
        const username = e.target.childNodes[0].childNodes[0].value;
        const password = e.target.childNodes[1].childNodes[0].value;
        // Login handler
        checkUserLogin(username, password, result => {
            // console.log(result);
            if (
                result.user &&
                result.isLogged &&
                result.user.authorization.name === "Admin"
            ) {
                this.setState({
                    adminIsLoggedIn: true,
                    user: result.user,
                    logginErrorMessagse: ""
                });
            } else {
                this.setState({
                    adminIsLoggedIn: false,
                    user: {},
                    logginErrorMessagse:
                        "Tài khoản hoặc mật khẩu chưa chính xác."
                });
            }
        });
    }

    render() {
        if (this.state.adminIsLoggedIn) {
            return <AdminIndex user={this.state.user} pathname={this.props.location.pathname} />;
        } else
            return (
                <div className="limiter">
                    <div
                        className="container-login100"
                        style={{ backgroundImage: 'url("./../admin-bg.jpg")' }}
                    >
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                                Admin - đăng nhập
                            </span>
                            <form
                                action="admin"
                                method="post"
                                className="login100-form validate-form p-b-33 p-t-5"
                                onSubmit={this.adminLoginHandler}
                            >
                                <div
                                    className="wrap-input100 validate-input"
                                    data-validate="Enter username"
                                >
                                    <input
                                        className="input100"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        defaultValue="admin1@gmail.com"
                                    />
                                    <span
                                        className="focus-input100"
                                        data-placeholder=""
                                    />
                                </div>
                                <div
                                    className="wrap-input100 validate-input"
                                    data-validate="Enter password"
                                >
                                    <input
                                        className="input100"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        defaultValue="123456"
                                    />
                                    <span
                                        className="focus-input100"
                                        data-placeholder=""
                                    />
                                </div>
                                <div className="container-login100-form-btn m-t-32">
                                    <p
                                        style={{
                                            color: "red",
                                            textAlign: "center"
                                        }}
                                    >
                                        {this.state.logginErrorMessagse}
                                    </p>
                                    <button className="login100-form-btn">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
    }
}
