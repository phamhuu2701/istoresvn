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
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
import { FacebookProvider, CustomChat } from 'react-facebook';
// core components
import UserNavbar from 'components/user/components/Navbars/UserNavbar.jsx';
import UserFooter from 'components/user/components/Footers/UserFooter.jsx';
import Sidebar from 'components/user/components/Sidebar/Sidebar.jsx';
import Index from 'components/user/views/Index.jsx';

import routes from 'userRoutes.js';

class User extends React.Component {
    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === '/user') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={() => <prop.component {...this.props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return 'Brand';
    };
    render() {
        if (this.props.location.pathname === '/user') {
            return (
                <>
                    <Sidebar
                        {...this.props}
                        routes={routes}
                        logo={{
                            outterLink: '/',
                            imgSrc: require('components/user/assets/img/brand/argon-react.png'),
                            imgAlt: '...'
                        }}
                    />
                    <div className='main-content' ref='mainContent'>
                        <UserNavbar
                            {...this.props}
                            brandText={this.getBrandText(
                                this.props.location.pathname
                            )}
                        />
                        <Index user={this.props.user} />
                        <FacebookProvider appId='984029191952495' chatSupport>
                            <CustomChat
                                pageId='326054444409287'
                                minimized={true}
                            />
                        </FacebookProvider>
                        <Container fluid={true}>
                            <UserFooter />
                        </Container>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Sidebar
                        {...this.props}
                        routes={routes}
                        logo={{
                            outterLink: '/',
                            imgSrc: require('components/user/assets/img/brand/argon-react.png'),
                            imgAlt: '...'
                        }}
                    />
                    <div className='main-content' ref='mainContent'>
                        <UserNavbar
                            {...this.props}
                            brandText={this.getBrandText(
                                this.props.location.pathname
                            )}
                        />
                        <Switch>{this.getRoutes(routes)}</Switch>
                        <FacebookProvider appId='984029191952495' chatSupport>
                            <CustomChat
                                pageId='326054444409287'
                                minimized={true}
                            />
                        </FacebookProvider>
                        <Container fluid={true}>
                            <UserFooter />
                        </Container>
                    </div>
                </>
            );
        }
    }
}

export default User;
