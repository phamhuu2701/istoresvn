import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";

// import "./e-shop-template/e-shop/css/bootstrap.min.css"
import './e-shop-template/e-shop/css/font-awesome.min.css';
import './e-shop-template/e-shop/css/nouislider.min.css';
import './e-shop-template/e-shop/css/slick-theme.css';
import './e-shop-template/e-shop/css/slick.css';
import './e-shop-template/e-shop/css/style.css';

import Header from './e-shop-template/Header';
import Footer from './e-shop-template/Footer';
import Home from './e-shop-template/Home';
import Products from './e-shop-template/Products';
import ProductDetail from './e-shop-template/ProductDetail';

class StoreIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: null,
            isNotFounded: false
        };
    }

    // UNSAFE_componentWillMount() {
    //     fetch("/api/stores/" + this.props.match.params.id)
    //         .then(res => res.json())
    //         .then(store => {
    //             this.setState({
    //                 store: store
    //             });
    //         });
    // }

    componentDidMount() {
        if (!this.state.store) {
            fetch('/api/stores/' + this.props.match.params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
                .then(res => res.json())
                .then(store => {
                    if (store) {
                        this.setState({
                            store: store
                        });
                    } else {
                        this.setState({
                            isNotFounded: true
                        });
                    }
                });
        }
    }

    render() {
        // console.log(this.props.match);
        // console.log(this.props.match.params.template);
        // console.log(this.props.match.params.id);
        // console.log(this.state.store);

        if (this.props.match.params.template !== 'null') {
            if (this.state.store) {
                return (
                    <div>
                        <Header store={this.state.store} />
                        <Switch>
                            <Route exact path={this.props.match.path}>
                                <Home store={this.state.store} />
                            </Route>
                            <Route
                                exact
                                path={this.props.match.path + '/products'}
                            >
                                <Products store={this.state.store} />
                            </Route>
                            <Route
                                exact
                                path={
                                    this.props.match.path +
                                    '/products/:idProduct'
                                }
                            >
                                <ProductDetail />
                            </Route>
                        </Switch>
                        <Footer store={this.state.store} />
                    </div>
                );
            } else if (!this.state.store && this.state.isNotFounded === false) {
                return <div>Đang tải dữ liệu</div>;
            } else {
                return <Redirect to='/' />;
            }
        } else {
            if (this.state.store) {
                return window.location.replace(this.state.store.website.url);
            } else if (!this.state.store && this.state.isNotFounded === false) {
                return <div></div>;
            } else {
                return <Redirect to='/' />;
            }
        }
    }
}

export default StoreIndex;
