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
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Card,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
// import { Link } from "react-router-dom";
// core components
import Header from 'components/admin/components/Headers/Header.jsx';
import { getUserModels } from '../../../../services/user.service';
import formatDate from '../../../../utils/dateUtils';

class UsersManage extends React.Component {
    constructor() {
        super();

        this.state = {
            userModels: [],
            fullUser: [],
            currentPage: 1,
            pages: []
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    deleteUser(e, key) {
        e.preventDefault();
        // Delete User
        fetch('/api/users/deleteUser?id=' + this.state.fullUser[key].user._id, {
            method: 'DELETE'
        })
            .then(result => {
                if (result.status === 200) {
                    const fullUser = this.state.fullUser;
                    fullUser.splice(key, 1);
                    this.setState({
                        userModels:
                            fullUser.length > 10
                                ? fullUser.slice(0, 10)
                                : fullUser
                    });
                    return result.json();
                } else {
                    alert('Xảy ra lỗi!');
                }
            })
            .then(user => {
                alert(
                    user.fullname.lastname,
                    user.fullname.firstname,
                    'Đã xóa tài khoản!'
                );
            })
            .catch(err => console.log(err));
    }

    previousPage() {
        this.setState({
            userModels: this.state.fullUser.slice(
                this.state.currentPage * 10 - 20,
                this.state.currentPage * 10 - 10
            ),
            currentPage: this.state.currentPage - 1
        });
    }

    nextPage() {
        this.setState({
            userModels:
                this.state.fullUser.length > this.state.currentPage * 10 - 10
                    ? this.state.fullUser.slice(
                          this.state.currentPage * 10,
                          this.state.currentPage * 10 + 10
                      )
                    : this.state.fullUser.slice(
                          this.state.currentPage * 10,
                          this.state.fullUser % 10
                      ),
            currentPage: this.state.currentPage + 1
        });
    }

    changePage(page) {
        this.setState({
            userModels:
                this.state.fullUser.length > page * 10 - 10
                    ? this.state.fullUser.slice(page * 10 - 10, page * 10)
                    : this.state.fullUser.slice(
                          page * 10 - 10,
                          page * 10 - 10 + (this.state.fullUser % 10)
                      ),
            currentPage: page
        });
    }

    componentDidMount() {
        getUserModels(userModels => {
            let pagenum = Math.ceil(userModels.length / 10);
            let pages = [];
            while (pagenum > 0) {
                pages.unshift(--pagenum);
            }
            this.setState({
                fullUser: userModels,
                pages: pages
            });
            if (userModels.length > 10) {
                this.setState({
                    userModels: userModels.slice(0, 10)
                });
            } else {
                this.setState({
                    userModels: userModels
                });
            }
        });
    }

    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container fluid={true}>
                    {/* Table */}
                    <Row className='mt-5'>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>
                                        Danh sách người dùng
                                    </h3>
                                </CardHeader>
                                <Table
                                    className='align-items-center table-flush table-flush-custom'
                                    responsive
                                >
                                    <thead className='thead-light'>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Họ tên</th>
                                            <th scope='col'>Số điện thoại</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'>Ngày tham gia</th>
                                            <th scope='col'>Cửa hàng</th>
                                            <th
                                                scope='col'
                                                style={{ textAlign: 'center' }}
                                            >
                                                <i className='fas fa-ellipsis-v' />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body'>
                                        {this.state.userModels.length > 0 &&
                                            this.state.userModels.map(
                                                (userModel, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <th
                                                            style={{
                                                                textTransform:
                                                                    'uppercase'
                                                            }}
                                                        >
                                                            <a
                                                                href='#pablo'
                                                                onClick={e =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                {userModel.user
                                                                    .fullname
                                                                    .lastname +
                                                                    ' ' +
                                                                    userModel
                                                                        .user
                                                                        .fullname
                                                                        .firstname}
                                                            </a>
                                                        </th>
                                                        <td>
                                                            {
                                                                userModel.user
                                                                    .phone
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                userModel.user
                                                                    .email
                                                            }
                                                        </td>
                                                        <td>
                                                            {formatDate(
                                                                userModel.user
                                                                    .timeRegister
                                                            )}
                                                        </td>
                                                        <td>
                                                            {
                                                                userModel.stores
                                                                    .length
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign:
                                                                    'center'
                                                            }}
                                                        >
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className='btn-icon-only text-light'
                                                                    href='#pablo'
                                                                    role='button'
                                                                    size='sm'
                                                                    color=''
                                                                    onClick={e =>
                                                                        e.preventDefault()
                                                                    }
                                                                >
                                                                    <i className='fas fa-ellipsis-v' />
                                                                </DropdownToggle>
                                                                <DropdownMenu
                                                                    className='dropdown-menu-arrow'
                                                                    right
                                                                >
                                                                    <DropdownItem
                                                                        onClick={e =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        Chi tiết
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        onClick={e =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        Cập nhập
                                                                        thông
                                                                        tin
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        onClick={e =>
                                                                            this.deleteUser(
                                                                                e,
                                                                                key
                                                                            )
                                                                        }
                                                                    >
                                                                        Xóa
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </Table>
                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <Pagination
                                            className='pagination justify-content-end mb-0'
                                            listClassName='justify-content-end mb-0'
                                        >
                                            <PaginationItem
                                                className={
                                                    this.state.currentPage === 1
                                                        ? 'disabled'
                                                        : ''
                                                }
                                            >
                                                <PaginationLink
                                                    onClick={this.previousPage}
                                                    tabIndex='-1'
                                                >
                                                    <i className='fas fa-angle-left' />
                                                    <span className='sr-only'>
                                                        Previous
                                                    </span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            {this.state.pages.map(v => {
                                                return (
                                                    <PaginationItem
                                                        className={
                                                            this.state
                                                                .currentPage -
                                                                1 ===
                                                            v
                                                                ? 'active'
                                                                : ''
                                                        }
                                                        key={v}
                                                    >
                                                        <PaginationLink
                                                            onClick={() =>
                                                                this.changePage(
                                                                    v + 1
                                                                )
                                                            }
                                                        >
                                                            {v + 1}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            })}
                                            <PaginationItem
                                                className={
                                                    this.state.fullUser.length -
                                                        this.state.currentPage *
                                                            10 >
                                                    0
                                                        ? ''
                                                        : 'disabled'
                                                }
                                            >
                                                <PaginationLink
                                                    onClick={this.nextPage}
                                                >
                                                    <i className='fas fa-angle-right' />
                                                    <span className='sr-only'>
                                                        Next
                                                    </span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default UsersManage;
