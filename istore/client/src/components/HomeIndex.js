import React, { Component } from 'react';

import './HomeIndex.css';
import Logo from './istore/Logo';
import Field from './istore/Field';
import Maps from './istore/Maps';
import DropdownUser from './istore/DropdownUser';
import ProductInformation from './istore/ProductInformation';
import MessageNotify from './istore/MessageNotify';
import Footer from './istore/Footer';

import { onZoomSearchFieldService } from '../services/store.service';

let that;

export function onZoomSearchField(zoom) {
    onZoomSearchFieldService(that, zoom);
}

export default class HomeIndex extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            interests: 0,
            message: '',
            leftBody: '',
            rigthBody: '',
            zoomIcon: '/resources/icons/zoom-in.svg',
            zoomTitle: 'Thu nhỏ',
            zoom_icon: 'zoom-icon'
        };
        this.logInToggle = this.logInToggle.bind(this);
        this.successSignUpHandler = this.successSignUpHandler.bind(this);
        this.onZoom = this.onZoom.bind(this);
        this.onZoomToogle = this.onZoomToogle.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    UNSAFE_componentWillMount() {
        that = this;
    }

    logInToggle(state, interests) {
        this.setState({ isLoggedIn: state, interests: interests });
    }

    UNSAFE_componentReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    successSignUpHandler(message) {
        this.setState({
            message: message
        });
        setTimeout(() => {
            this.setState({
                message: ''
            });
        }, 4000);
    }

    onZoomToogle() {
        if (this.state.zoom_icon.includes('left')) {
            this.onZoom('normal');
        } else if (this.state.zoom_icon === 'zoom-icon') {
            this.onZoom('in');
        } else this.onZoom('normal');
    }

    onZoom(zoom) {
        if (zoom === 'in') {
            this.setState({
                leftBody: 'big',
                rigthBody: 'small',
                zoomIcon: '/resources/icons/zoom-out.svg',
                zoomTitle: 'Thu nhỏ',
                zoom_icon: 'zoom-icon right'
            });
        } else if (zoom === 'out') {
            this.setState({
                leftBody: 'small',
                rigthBody: 'big',
                zoomIcon: '/resources/icons/zoom-in.svg',
                zoomTitle: 'Phóng to',
                zoom_icon: 'zoom-icon left'
            });
        } else if (zoom === 'normal') {
            this.setState({
                leftBody: '',
                rigthBody: '',
                zoomIcon: '/resources/icons/zoom-in.svg',
                zoomTitle: 'Phóng to',
                zoom_icon: 'zoom-icon'
            });
        } else {
            // Hidden search field
            this.setState({
                leftBody: 'hidden',
                rigthBody: 'fullScreen'
            });
        }
    }

    checkLoggedIn() {
        if (this.state.isLoggedIn) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className='app'>
                <div className={'app-body-left ' + this.state.leftBody}>
                    <Logo />
                    <Field
                        onZoom={this.onZoom}
                        checkLoggedIn={this.checkLoggedIn}
                        interests={this.state.interests}
                    />
                </div>
                <img
                    className={this.state.zoom_icon}
                    src={this.state.zoomIcon}
                    alt={this.state.zoomTitle}
                    onClick={this.onZoomToogle}
                />
                <div className={'app-body-right ' + this.state.rigthBody}>
                    <Maps />
                </div>
                <ProductInformation />
                <DropdownUser
                    logInToggle={this.logInToggle}
                    successSignUpHandler={this.successSignUpHandler}
                />
                <Footer />
                <MessageNotify message={this.state.message} />
            </div>
        );
    }
}
