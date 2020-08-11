import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeIndex from './components/HomeIndex';
import StoreIndex from './components/StoreIndex';
import AdminLogin from './components/AdminLogin';
import VerifyIndex from './components/VerifyIndex';
import CancelNotifyIndex from './components/CancelNotifyIndex';
import UserIndex from './components/UserIndex';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={HomeIndex} />
                    <Route path='/store/:template/:id' component={StoreIndex} />
                    <Route path='/verify' component={VerifyIndex} />
                    <Route
                        path='/cancel-notify/:userId/:interestId'
                        component={CancelNotifyIndex}
                    />
                    <Route path='/user' component={UserIndex} />
                    <Route path='/admin' component={AdminLogin} />
                    <Route path='/user-auth' component={UserIndex} />
                    <Route path='/admin-auth' component={AdminLogin} />
                </Switch>
            </Router>
        );
    }
}
