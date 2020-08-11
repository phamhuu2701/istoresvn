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
import React from "react";

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
    Col,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    FormGroup,
    Form,
    Input,
    Label
} from "reactstrap";
// import { Link } from "react-router-dom";
// core components
import Header from "components/admin/components/Headers/Header.jsx";
import getEmployees, { getEmployeeById } from "../../../../services/employee.service";
import getDepartments from "../../../../services/department.service";
import formatDate from "../../../../utils/dateUtils";
import priceFormatUtil from "../../../../utils/priceFormat";

import "components/admin/assets/css/custom.css";
import MessageNotify from "../../../istore/MessageNotify";

class EmployeesManage extends React.Component {
    constructor() {
        super();

        this.state = {
            employees: [],
            allEmployees: [],
            pages: [],
            currentPage: 1,

            departments: [],

            employeeSelected: null,
            isShowEmployeeInfo: "hide",

            isShowEmployeeFormInfo: "hide",
            messageNotify: ""
        }

        this.showEmployeeInfo = this.showEmployeeInfo.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onAddEmployeeClick = this.onAddEmployeeClick.bind(this);
        this.onAddEmployeeSubmitClick = this.onAddEmployeeSubmitClick.bind(this);
        this.onAddEmployeeCancelClick = this.onAddEmployeeCancelClick.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    previousPage() {
        this.setState({
            employees: this.state.allEmployees.slice(
                this.state.currentPage * 10 - 20,
                this.state.currentPage * 10 - 10
            ),
            currentPage: this.state.currentPage - 1
        });
    }

    nextPage() {
        this.setState({
            employees:
                this.state.allEmployees.length > this.state.currentPage * 10 - 10
                    ? this.state.allEmployees.slice(
                          this.state.currentPage * 10,
                          this.state.currentPage * 10 + 10
                      )
                    : this.state.allEmployees.slice(
                          this.state.currentPage * 10,
                          this.state.allEmployees % 10
                      ),
            currentPage: this.state.currentPage + 1
        });
    }

    changePage(page) {
        this.setState({
            employees:
                this.state.allEmployees.length > page * 10 - 10
                    ? this.state.allEmployees.slice(page * 10 - 10, page * 10)
                    : this.state.allEmployees.slice(
                          page * 10 - 10,
                          page * 10 - 10 + (this.state.allEmployees % 10)
                      ),
            currentPage: page
        });
    }

    componentDidMount() {
        getEmployees(employees => {
            let pagenum = Math.ceil(employees.length / 10);
            let pages = [];
            while (pagenum > 0) {
                pages.unshift(--pagenum);
            }
            this.setState({
                allEmployees: employees,
                pages: pages
            });
            if (employees.length > 10) {
                this.setState({
                    employees: employees.slice(0, 10)
                })
            }
            else {
                this.setState({
                    employees: employees
                })
            }
        });

        getDepartments(departments => {
            this.setState({
                departments: departments
            })
        })
    }

    showEmployeeInfo(id) {
        getEmployeeById(id, employee => {
            this.setState({
                employeeSelected: employee,
                isShowEmployeeInfo: "open",
                messageNotify: ""
            })
        })
    }

    onSubmitClick() {
        this.setState({
            employeeSelected: null,
            isShowEmployeeInfo: "hide",
            messageNotify: "Cập nhật thông tin nhân viên thành công"
        })
    }

    onCancelClick() {
        this.setState({
            employeeSelected: null,
            isShowEmployeeInfo: "hide",
            messageNotify: ""
        })
    }

    onAddEmployeeClick(){
        this.setState({
            isShowEmployeeFormInfo: "open",
            messageNotify: ""
        })
    }

    onAddEmployeeSubmitClick(){
        this.setState({
            isShowEmployeeFormInfo: "hide",
            messageNotify: "Thêm nhân viên thành công"
        })
    }

    onAddEmployeeCancelClick(){
        this.setState({
            isShowEmployeeFormInfo: "hide",
            messageNotify: ""
        })
    }

    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="AdminManageEmployees" fluid={true}>
                    <Row className="mt-3">
                        <Col className="container-button-add-store">
                            <Button onClick={this.onAddEmployeeClick} className="btn btn-success">Thêm nhân viên</Button>
                        </Col>
                    </Row>
                    {/* Table */}
                    <Row className="mt-3">
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Danh sách nhân viên</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush table-flush-custom" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Họ tên</th>
                                            <th scope="col">Phòng ban</th>
                                            <th scope="col">Lương (VND)</th>
                                            <th scope="col">Ngày bắt đầu</th>
                                            <th scope="col" style={{ "textAlign": "center" }}><i className="fas fa-ellipsis-v" /></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {
                                            this.state.employees.length > 0 &&
                                            this.state.employees.map((employee, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <th style={{ "textTransform": "uppercase" }}>
                                                        <span style={{ "color": "blue", "cursor": "pointer" }}
                                                            onClick={e => this.showEmployeeInfo(employee._id)}>
                                                            {employee.user.fullname.firstname + " " + employee.user.fullname.lastname}
                                                        </span>
                                                    </th>
                                                    <td>{employee.department.name}</td>
                                                    <td>{priceFormatUtil(employee.salary)}</td>
                                                    <td>
                                                        {formatDate(employee.timeStart)}
                                                    </td>
                                                    <td style={{ "textAlign": "center" }}>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem onClick={e => e.preventDefault()}>
                                                                    Chi tiết
                                                                </DropdownItem>
                                                                <DropdownItem onClick={e => e.preventDefault()}>
                                                                    Cập nhập thông tin
                                                                </DropdownItem>
                                                                <DropdownItem onClick={e => e.preventDefault()}>
                                                                    Xóa
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className={
                                                    this.state.currentPage === 1
                                                        ? 'disabled'
                                                        : ''
                                                }>
                                                <PaginationLink
                                                    onClick={this.previousPage}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
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
                                            <PaginationItem className={
                                                    this.state.allEmployees
                                                        .length -
                                                        this.state.currentPage *
                                                            10 >
                                                    0
                                                        ? ''
                                                        : 'disabled'
                                                }>
                                                <PaginationLink
                                                    onClick={this.nextPage}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    {/* Table */}
                    <Row className={"mt-5 " + this.state.isShowEmployeeInfo}>
                        <Col>
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 id="user-info" className="mb-0">Thông tin nhân viên</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin cá nhân
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            Tên
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.fullname.firstname}
                                                            id="input-first-name"
                                                            placeholder="Tên"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Họ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.fullname.lastname}
                                                            id="input-last-name"
                                                            placeholder="Họ"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-phone"
                                                        >
                                                            Số điện thoại
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.phone}
                                                            id="input-phone"
                                                            placeholder="Số điện thoại"
                                                            type="tel"
                                                            maxLength={10}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.email}
                                                            id="input-email"
                                                            placeholder="istore@gmail.com"
                                                            type="email"
                                                            maxLength={30}
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        Giới tính
                                                    </label>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={true}
                                                                readOnly={true}
                                                                defaultChecked={this.state.employeeSelected && this.state.employeeSelected.user.gender ? true : false} />{' '}
                                                            Nam
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={false}
                                                                readOnly={true}
                                                                defaultChecked={this.state.employeeSelected && this.state.employeeSelected.user.gender ? false : true} />{' '}
                                                            Nữ
                                                        </Label>
                                                    </FormGroup>
                                                    <br />
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-birthday"
                                                        >
                                                            Ngày sinh
                                                        </label>
                                                        <Input
                                                            type="date"
                                                            id="input-birthday"
                                                            placeholder="Ngày sinh"
                                                            readOnly={true}
                                                            defaultValue={formatDate(this.state.employeeSelected && this.state.employeeSelected.user.birthday)}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Chức vụ công việc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="id-employee"
                                                        >
                                                            ID nhân viên
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected._id}
                                                            id="id-employee"
                                                            placeholder="ID nhân viên"
                                                            type="text"
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-department"
                                                        >
                                                            Phòng ban
                                                        </label>
                                                        <Input type="select" name="department" id="input-department">
                                                            <option value={(this.state.employeeSelected && this.state.employeeSelected.department._id) || null}>
                                                                {(this.state.employeeSelected && this.state.employeeSelected.department.name) || "Phòng ban"}
                                                            </option>
                                                            {
                                                                this.state.departments &&
                                                                this.state.departments.map((department, key) => (
                                                                    <option key={key} value={department._id}>{department.name}</option>
                                                                ))
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-salary"
                                                        >
                                                            Lương (VND)
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.salary}
                                                            id="input-salary"
                                                            placeholder="Lương (VND)"
                                                            type="number"
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-timeStart"
                                                        >
                                                            Ngày bắt đầu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={formatDate(this.state.employeeSelected && this.state.employeeSelected.timeStart)}
                                                            id="input-timeStart"
                                                            placeholder="Ngày bắt đầu"
                                                            type="date"
                                                            required={true}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin liên lạc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Địa chỉ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.address}
                                                            id="input-address"
                                                            placeholder="Địa chỉ"
                                                            type="text"
                                                            maxLength={100}
                                                            readOnly={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">Giới thiệu</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>Giới thiệu</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Hãy viết gì đó về bạn"
                                                    rows="4"
                                                    type="textarea"
                                                    id="input-about"
                                                    defaultValue={this.state.employeeSelected && this.state.employeeSelected.user.about}
                                                    readOnly={true}
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="pl-lg-4" style={{ "textAlign": "right" }}>
                                            <Button type="button" className="btn" color="warning"
                                                onClick={this.onCancelClick}
                                            >
                                                HỦY</Button>
                                            <Button type="button" className="btn" color="primary"
                                                onClick={this.onSubmitClick}
                                            >
                                                CẬP NHẬT</Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/** form create new employee */}
                    <Row className={"mt-5 " + this.state.isShowEmployeeFormInfo}>
                        <Col>
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 id="user-info" className="mb-0">THÊM NHÂN VIÊN</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin cá nhân
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            Tên
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-first-name"
                                                            placeholder="Tên"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Họ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-last-name"
                                                            placeholder="Họ"
                                                            type="text"
                                                            maxLength={30}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-phone"
                                                        >
                                                            Số điện thoại
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-phone"
                                                            placeholder="Số điện thoại"
                                                            type="tel"
                                                            maxLength={10}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="istore@gmail.com"
                                                            type="email"
                                                            maxLength={30}
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        Giới tính
                                                    </label>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={true}/>{' '}
                                                            Nam
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="radio" name="radio2"
                                                                defaultValue={false} 
                                                                defaultChecked={true} />{' '}
                                                            Nữ
                                                        </Label>
                                                    </FormGroup>
                                                    <br />
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-birthday"
                                                        >
                                                            Ngày sinh
                                                        </label>
                                                        <Input
                                                            type="date"
                                                            id="input-birthday"
                                                            placeholder="Ngày sinh"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Chức vụ công việc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-department"
                                                        >
                                                            Phòng ban
                                                        </label>
                                                        <Input type="select" name="department" id="input-department">
                                                            <option value="">Phòng ban</option>
                                                            {
                                                                this.state.departments &&
                                                                this.state.departments.map((department, key) => (
                                                                    <option key={key} value={department._id}>{department.name}</option>
                                                                ))
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-salary"
                                                        >
                                                            Lương (VND)
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-salary"
                                                            placeholder="Lương (VND)"
                                                            type="number"
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-timeStart"
                                                        >
                                                            Ngày bắt đầu
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={formatDate(new Date())}
                                                            id="input-timeStart"
                                                            placeholder="Ngày bắt đầu"
                                                            type="date"
                                                            required={true}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Thông tin liên lạc
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Địa chỉ
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-address"
                                                            placeholder="Địa chỉ"
                                                            type="text"
                                                            maxLength={100}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">Giới thiệu</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>Giới thiệu</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Hãy viết gì đó về bạn"
                                                    rows="4"
                                                    type="textarea"
                                                    id="input-about"
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="pl-lg-4" style={{"textAlign" : "right"}}>
                                            <Button type="button" className="btn" color="warning"
                                                onClick={this.onAddEmployeeCancelClick}
                                            >
                                                HỦY</Button>
                                            <Button type="button" className="btn" color="primary"
                                                onClick={this.onAddEmployeeSubmitClick}
                                            >
                                                TẠO NHÂN VIÊN</Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <MessageNotify message={this.state.messageNotify} />
                </Container>
            </>
        );
    }
}

export default EmployeesManage;
