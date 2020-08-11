import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'components/user/assets/vendor/nucleo/css/nucleo.css';
import 'components/user/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import 'components/user/assets/scss/argon-dashboard-react.scss';

import UserLayout from 'components/user/layouts/User.jsx';
import AuthLayout from 'components/user/layouts/Auth.jsx';

export default class UserIndex extends Component {
    constructor() {
        super();

        this.state = {
            isLogged: false,
            user: null,
            isLoginError: false
        };
    }

    componentDidMount() {
        fetch('/api/login')
            .then(res => res.json())
            .then(result => {
                if (result.isLogged === true) {
                    this.setState({
                        isLogged: true,
                        user: result.user
                    });
                } else {
                    this.setState({
                        isLoginError: true
                    });
                }
            });
    }

    render() {
        if (this.state.isLogged) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            path='/user'
                            render={props => (
                                <UserLayout {...props} user={this.state.user} />
                            )}
                        />
                        <Route
                            path='/user-auth'
                            render={props => <AuthLayout {...props} />}
                        />
                    </Switch>
                </BrowserRouter>
            );
        } else if (this.state.isLoginError) {
            alert('Vui lòng đăng nhập để có thể thực hiện chức năng này!');
            return <Redirect from='/' to='/' />;
        } else {
            return <div></div>;
        }
    }
}
