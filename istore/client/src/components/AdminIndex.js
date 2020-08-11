import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "components/admin/assets/vendor/nucleo/css/nucleo.css";
import "components/admin/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "components/admin/assets/scss/argon-dashboard-react.scss";

import AdminLayout from "components/admin/layouts/Admin.jsx";
import AuthLayout from "components/admin/layouts/Auth.jsx";

export default class AdminIndex extends Component {
    render() {
        if (this.props.user) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/admin"
                            render={props => (
                                <AdminLayout
                                    {...props}
                                    user={this.props.user}
                                />
                            )}
                        />
                        <Route
                            path="/admin-auth"
                            render={props => <AuthLayout {...props} />}
                        />
                    </Switch>
                </BrowserRouter>
            );
        } else {
            return <Redirect to="/admin" />;
        }
    }
}
