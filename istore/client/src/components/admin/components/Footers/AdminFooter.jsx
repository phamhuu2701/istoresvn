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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
    render() {
        return (
            <Container className="footer">
                <Row className="align-items-center justify-content-xl-between">
                    <Col xl="6">
                        <div className="copyright text-center text-xl-left text-muted">
                            © 2019
                            <a
                                className="font-weight-bold ml-1"
                                href="#pablo"
                                rel="noopener noreferrer"
                            >
                                - iStore
                            </a>
                        </div>
                    </Col>

                    <Col xl="6">
                        <Nav className="nav-footer justify-content-center justify-content-xl-end">
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                >
                                    Về chúng tôi
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                >
                                    Bản tin
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                >
                                    Chính sách người dùng
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                >
                                    Liên hệ hỗ trợ
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Footer;
