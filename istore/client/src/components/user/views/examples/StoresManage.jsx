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
    Badge,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Col,
    Button,
    Card,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from "reactstrap";
// core components
import Header from "components/user/components/Headers/Header.jsx";
import { getStoresBySizeByIdUser, checkStoresCountCreated } from "../../../../services/user.service";
import "./StoresManage.css";
import BuyMoreStoresAlert from "./BuyMoreStoresAlert";

import { getFullAddress } from "../../../../utils/storeUtils";
import getStoreCategories, { getStoreCategoryById } from "../../../../services/storeCategory.service";
import getCities, { getDistrictsByIdCity, getCityById } from "../../../../services/city.service";
import { getStreetsByIdDistrict, getDistrictById } from "../../../../services/district.service";
import { getStreetById } from "../../../../services/street.service";
import MessageNotify from "../../../istore/MessageNotify";
import { addStore } from "../../../../services/store.service";
import getLatLngFromAddress from "../../../../services/map2.service";
import PhoneAdd from "./PhoneAdd";


class StoresManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            showPhoneAddModal: false,
            isTemplateItem1Clicked: false,
            isTemplateItem2Clicked: false,
            templateNumber: null,
            isShowTemplateSelect: false,
            isShowStoreInfoInput: false,
            storeCategories: [],
            cities: [],
            districts: [],
            streets: [],
            storeCategory: null,
            city: null,
            district: null,
            street: null,
            website: {
                hasWebsite: false,
                url: ""
            },
            coordinates: [],

            hasWebsite: false,
            inputStoreTemplateId: "",
            inputStoreCategoryId: "",
            inputStoreName: "",
            inputStoreDescription: "",
            inputStoreHouseNumber: "",
            inputStoreCityId: "",
            inputStoreDistrictId: "",
            inputStoreStreetId: "",
            inputStoreEmail: props.user.email,
            inputStorePhone: props.user.phone,
            inputStoreWebsite: "",

            storeCategoryErrorMessage: "",
            storeNameErrorMessage: "",
            storeHouseNumberErrorMessage: "",
            storeCityErrorMessage: "",
            storeDistrictErrorMessage: "",
            storeStreetErrorMessage: "",
            storeEmailErrorMessage: "",
            storePhoneErrorMessage: "",
            storeWebsiteErrorMessage: "",

            addStoreErrorMessage: "",
            addStoreResultMessage: "",

            showBuyMoreStoresAlert: false,

            paginationClassName: {
                pagination1: "active",
                pagination2: "",
                pagination3: "",
            }
        }

        this.onAddStoreClick = this.onAddStoreClick.bind(this);
        this.handeResultPhoneAdd = this.handeResultPhoneAdd.bind(this);
        this.onTemplatesItemClick = this.onTemplatesItemClick.bind(this);
        this.onCheckboxHasWebsiteClick = this.onCheckboxHasWebsiteClick.bind(this);
        this.onStoreCategoryChange = this.onStoreCategoryChange.bind(this);
        this.onSelectCityChange = this.onSelectCityChange.bind(this);
        this.onSelectDistrictChange = this.onSelectDistrictChange.bind(this);
        this.onSelectStreetsChange = this.onSelectStreetsChange.bind(this);
        this.onInputStoreInfoChange = this.onInputStoreInfoChange.bind(this);
        this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
        this.getStoresBySize = this.getStoresBySize.bind(this);
    }

    componentDidMount() {
        this.setState({
            stores: getStoresBySizeByIdUser(this, this.props.user._id, 0, 10)
        })

        getStoreCategories(this);
        getCities(this);
    }

    getStoresBySize(value) {
        const stores = getStoresBySizeByIdUser(this, this.props.user._id, (value - 1) * 10, value * 10);
        console.log(stores);

        this.setState({
            stores: getStoresBySizeByIdUser(this, this.props.user._id, (value - 1) * 10, value * 10)
        })

        switch (value) {
            case 1:
                this.setState({
                    paginationClassName: {
                        pagination1: "active",
                        pagination2: "",
                        pagination3: "",
                    }
                })
                break;
            case 2:
                this.setState({
                    paginationClassName: {
                        pagination1: "",
                        pagination2: "active",
                        pagination3: "",
                    }
                })
                break;
            case 3:
                this.setState({
                    paginationClassName: {
                        pagination1: "",
                        pagination2: "",
                        pagination3: "active",
                    }
                })
                break;

            default:
                this.setState({
                    paginationClassName: {
                        pagination1: "active",
                        pagination2: "",
                        pagination3: "",
                    }
                })
                break;
        }
    }

    onAddStoreClick() {
        checkStoresCountCreated(this.props.user).then(
            result => {
                this.setState({
                    isShowTemplateSelect: true
                })
            },
            err => {
                this.setState({
                    showBuyMoreStoresAlert: true
                })
            }
        )
    }

    handeResultPhoneAdd(phone) {
        if (phone) {
            this.setState({
                showPhoneAddModal: false,
                isShowTemplateSelect: true,
                inputStorePhone: phone
            });
            this.props.user.phone = phone;
        }
        else {
            this.setState({
                showPhoneAddModal: false
            })
        }
    }

    onTemplatesItemClick(e) {
        if (e.target.id === "item-1") {
            this.setState({
                isTemplateItem1Clicked: true,
                isTemplateItem2Clicked: false,
                templateNumber: 1,
                showPhoneAddModal: false,
                isShowStoreInfoInput: true,
                inputStoreTemplateId: 1,
                hasWebsite: false
            })
        }
        else if (e.target.id === "item-2") {
            this.setState({
                isTemplateItem1Clicked: false,
                isTemplateItem2Clicked: true,
                templateNumber: 2,
                showPhoneAddModal: false,
                isShowStoreInfoInput: true,
                inputStoreTemplateId: 2,
                hasWebsite: false
            })
        }

    }

    onCheckboxHasWebsiteClick() {
        this.setState({
            hasWebsite: !this.state.hasWebsite,
            isShowTemplateSelect: true,
            isShowStoreInfoInput: this.state.hasWebsite ? false : true,
            showPhoneAddModal: false,
            templateNumber: null,
            inputStoreTemplateId: null,
            website: {
                hasWebsite: this.state.hasWebsite ? false : true,
                url: ""
            }
        })
    }

    onStoreCategoryChange(e) {
        let id = e.target.value;

        this.setState({
            inputStoreCategoryId: id,
            storeCategoryErrorMessage: ""
        })

        getStoreCategoryById(this, id);
    }

    onSelectCityChange(e) {
        let id = e.target.value;

        this.setState({
            inputStoreCityId: id,
            storeCityErrorMessage: ""
        })

        getDistrictsByIdCity(this, id);
        getCityById(this, id);
    }

    onSelectDistrictChange(e) {
        let id = e.target.value;

        this.setState({
            inputStoreDistrictId: id,
            storeDistrictErrorMessage: ""
        })

        getStreetsByIdDistrict(this, id);
        getDistrictById(this, id);
    }

    onSelectStreetsChange(e) {
        let id = e.target.value;

        this.setState({
            inputStoreStreetId: id,
            storeStreetErrorMessage: ""
        })

        getStreetById(this, id);
    }

    onInputStoreInfoChange(e) {
        if (e.target.id === "name") {
            this.setState({
                inputStoreName: e.target.value,
                storeNameErrorMessage: ""
            })
        }
        if (e.target.id === "description") {
            this.setState({
                inputStoreDescription: e.target.value
            })
        }
        if (e.target.id === "houseNumber") {
            this.setState({
                inputStoreHouseNumber: e.target.value,
                storeHouseNumberErrorMessage: ""
            })
        }
        if (e.target.id === "email") {
            this.setState({
                inputStoreEmail: e.target.value,
                storeEmailErrorMessage: ""
            })
        }
        if (e.target.id === "phone") {
            this.setState({
                inputStorePhone: e.target.value,
                storePhoneErrorMessage: ""
            })
        }
        if (e.target.id === "website") {
            this.setState({
                inputStoreWebsite: e.target.value,
                website: {
                    hasWebsite: true,
                    url: e.target.value
                },
                storeWebsiteErrorMessage: ""
            })
        }
    }

    onCancelButtonClick() {
        window.location.reload();
    }

    onSubmitButtonClick() {
        if (!this.state.storeCategory) {
            this.setState({
                storeCategoryErrorMessage: "Nhóm cửa hàng không được để trống."
            })
        }
        if (!this.state.city) {
            this.setState({
                storeCityErrorMessage: "Thành phố không được để trống."
            })
        }
        if (!this.state.district) {
            this.setState({
                storeDistrictErrorMessage: "Quận huyện không được để trống."
            })
        }
        if (!this.state.street) {
            this.setState({
                storeStreetErrorMessage: "Quận huyện không được để trống."
            })
        }
        if (!this.state.inputStoreHouseNumber) {
            this.setState({
                storeHouseNumberErrorMessage: "Số nhà không được để trống."
            })
        }
        if (!this.state.inputStorePhone) {
            this.setState({
                storePhoneErrorMessage: "Số điện thoại không được để trống."
            })
        }
        if (!this.state.inputStoreEmail) {
            this.setState({
                storeEmailErrorMessage: "Email không được để trống."
            })
        }
        if (!this.state.inputStoreName) {
            this.setState({
                storeNameErrorMessage: "Tên cửa hàng không được để trống."
            })
        }
        if (this.state.website.hasWebsite && !this.state.website.url) {
            this.setState({
                storeWebsiteErrorMessage: "Website cửa hàng không được để trống."
            })
        }

        const store = {
            storeCategory: this.state.storeCategory,
            user: this.props.user,
            city: this.state.city,
            district: this.state.district,
            street: this.state.street,
            houseNumber: this.state.inputStoreHouseNumber,
            phone: this.state.inputStorePhone,
            email: this.state.inputStoreEmail,
            name: this.state.inputStoreName,
            description: this.state.inputStoreDescription,
            website: this.state.website,
            template: this.state.inputStoreTemplateId
        }

        if (store.storeCategory && store.user && store.city
            && store.district && store.street && store.houseNumber
            && store.phone && store.email && store.name) {
            if (store.website.hasWebsite && !store.website.url) {
                this.setState({
                    addStoreErrorMessage: "Thông tin nhà trọ chưa hợp lệ. Vui lòng kiểm tra lại."
                })
            }
            else if (!store.website.hasWebsite && !store.template) {
                this.setState({
                    addStoreErrorMessage: "Thông tin nhà trọ chưa hợp lệ. Vui lòng kiểm tra lại."
                })
            }
            else {

                getLatLngFromAddress(getFullAddress(store), (location) => {
                    // console.log(location); // {lat, lng}

                    // let coordinates = [location.lng, location.lat]; // [lng, lat] 

                    const storeLocation = {
                        type: "Point",
                        coordinates: [location.lng, location.lat] // [lng, lat]
                    }

                    store.location = storeLocation;
                    // console.log(store);

                    // add store
                    addStore(store, (messageResult) => {
                        // hide add store form
                        this.setState({
                            stores: getStoresBySizeByIdUser(this, this.props.user._id, 0, 10),
                            isShowTemplateSelect: false,
                            isShowStoreInfoInput: false,
                            addStoreErrorMessage: "",
                            addStoreResultMessage: messageResult
                        });
                    });
                });


            }
        }
        else {
            this.setState({
                addStoreErrorMessage: "Thông tin nhà trọ chưa hợp lệ. Vui lòng kiểm tra lại."
            })
        }
    }

    render() {
        // console.log(this.props.user);
        console.log();
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="stores-manage" fluid={true}>
                    {/* Button Add Store */}
                    <Row className="mt-5">
                        <Col>
                            <span style={{"paddingLeft" : "10px"}}>- Số cửa hàng có thể tạo thêm: </span>
                            <b>{this.state.stores && this.props.user.maxStoresCountCreated.count - this.state.stores.length}</b>
                        </Col>
                        <Col className="container-button-add-store">
                            <Button onClick={this.onAddStoreClick} className="btn btn-success">Thêm cửa hàng</Button>
                        </Col>
                    </Row>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Danh sách cửa hàng</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush table-flush-custom" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>#</th>
                                            <th scope="col">Cửa hàng</th>
                                            <th scope="col">Phân loại</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col" style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>Trạng thái</th>
                                            <th scope="col" style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}><i className="fas fa-ellipsis-v" /></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {
                                            this.state.stores &&
                                            this.state.stores.map((store, key) => (
                                                <tr key={key}>
                                                    <td style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>{key + 1}</td>
                                                    <th style={{ "textTransform": "uppercase" }}>
                                                        <a href={
                                                            store.website.hasWebsite ?
                                                                store.website.url :
                                                                "/store/" + store.template + "/" + store._id
                                                        } target="_blank" rel="noopener noreferrer">
                                                            {store.name.substring(0, 20)}
                                                        </a>
                                                    </th>
                                                    <td>{store.storeCategory.name}</td>
                                                    <td>{getFullAddress(store)}</td>
                                                    <td style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>
                                                        <Badge color="" className="badge-dot mr-4">
                                                            {store.isActive ?
                                                                (<span className="is-active-true"><i className="bg-success" />Đang hoạt động</span>) :
                                                                (<span className="is-active-false"><i className="bg-warning" />Ngừng hoạt động</span>)}
                                                        </Badge>
                                                    </td>
                                                    <td className="text-right" style={{ "paddingLeft": "20px", "paddingRight": "20px", "textAlign": "center" }}>
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
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className={this.state.paginationClassName.pagination1}>
                                                <PaginationLink
                                                    onClick={e => this.getStoresBySize(1)}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className={this.state.paginationClassName.pagination2}>
                                                <PaginationLink
                                                    onClick={e => this.getStoresBySize(2)}
                                                >
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className={this.state.paginationClassName.pagination3}>
                                                <PaginationLink
                                                    onClick={e => this.getStoresBySize(3)}
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    onClick={e => e.preventDefault()}
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
                    {/* <PhoneActivate show={this.state.showPhoneAddModal} phone={this.props.user.phone} /> */}
                    <PhoneAdd show={this.state.showPhoneAddModal} user={this.props.user} handeResultPhoneAdd={this.handeResultPhoneAdd} />
                    <hr />
                    {/* Add store */}
                    <div className={"store-template-select " + (this.state.isShowTemplateSelect ? "show" : "hide")}>
                        <h3>CHỌN MẪU GIAO DIỆN CỬA HÀNG</h3>
                        <div>
                            <Label check className="checkbox-has-website">
                                <Input type="checkbox" id="checkbox" onClick={this.onCheckboxHasWebsiteClick} />{' '}
                                Tôi đã có website riêng
                            </Label>
                        </div>
                        <hr />
                        <div className={this.state.hasWebsite ? "hide" : "show"}>
                            <Row>
                                <Col xs="6" sm="3">
                                    <div className={"store-template-select-item " + (this.state.isTemplateItem1Clicked ? "item-selected" : "")}>
                                        <img alt="" src="https://www.joomla-monster.com/media/djcatalog2/images/item/1/jm-computers-electronics-store_l.jpg" />
                                        <span className="title-bg-success">Thương mại bán lẻ</span>
                                        <span id="item-1" className="item-over" onClick={this.onTemplatesItemClick}></span>
                                    </div>
                                </Col>
                                <Col xs="6" sm="3">
                                    <div className={"store-template-select-item " + (this.state.isTemplateItem2Clicked ? "item-selected" : "")}>
                                        <img alt="" src="https://cdn.freshdesignweb.com/wp-content/uploads/site/la-resto-cafe-responsive-website-template.jpg" />
                                        <span className="title-bg-primary">Dịch vụ ăn uống</span>
                                        <span id="item-2" className="item-over" onClick={this.onTemplatesItemClick}></span>
                                    </div>
                                </Col>
                                <Col xs="6" sm="3">
                                    <div className="store-template-select-item">
                                        <img alt="" src="https://cdn.freshdesignweb.com/wp-content/uploads/site/tasfiu-business-html-template.jpg" />
                                        <span className="title-bg-warning">Doanh nghiệp</span>
                                    </div>
                                </Col>
                                <Col xs="6" sm="3">
                                    <div className="store-template-select-item">
                                        <img alt="" src="https://s.tmimgcdn.com/scr/54700/electromo-electronics-store-ecommerce-clean-opencart-template_54714-original.jpg" />
                                        <span className="title-bg-info">Xem thêm..</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={"store-info-input " + (this.state.isShowStoreInfoInput ? "show" : "hide")}>
                        <h3>THÔNG TIN CỬA HÀNG</h3>
                        <hr />
                        <Form>
                            <FormGroup row className={this.state.hasWebsite ? "hide" : ""}>
                                <Label for="template" sm={2}>Mẫu giao diện website</Label>
                                <Col sm={10}>
                                    <Input type="text"
                                        name="template"
                                        id="template"
                                        defaultValue={this.state.templateNumber}
                                        readOnly={true} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="storeCategory" sm={2}>Nhóm cửa hàng</Label>
                                <Col sm={10}>
                                    <Input type="select" name="storeCategory" id="storeCategory"
                                        onChange={this.onStoreCategoryChange}>
                                        <option value={null}>Phân loại</option>
                                        {
                                            this.state.storeCategories &&
                                            this.state.storeCategories.map((storeCategory, key) => (
                                                <option key={key} value={storeCategory._id}>{storeCategory.name}</option>
                                            ))
                                        }
                                    </Input>
                                    <span className={"error-message " + (this.state.storeCategoryErrorMessage ? "show" : "")}>
                                        {this.state.storeCategoryErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={2}>Tên cửa hàng</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Tên cửa hàng"
                                        onChange={this.onInputStoreInfoChange}
                                        required={true} />
                                    <span className={"error-message " + (this.state.storeNameErrorMessage ? "show" : "")}>
                                        {this.state.storeNameErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={2}>Giới thiệu</Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                        placeholder="Hãy giới thiệu về cửa hàng bạn.."
                                        onChange={this.onInputStoreInfoChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="" sm={2}>Địa chỉ</Label>
                                <Col sm={10}>
                                    <Row form>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="houseNumber">Số nhà</Label>
                                                <Input type="text" name="houseNumber" id="houseNumber"
                                                    placeholder="Số nhà"
                                                    onChange={this.onInputStoreInfoChange}
                                                    required={true} />
                                                <span className={"error-message " + (this.state.storeHouseNumberErrorMessage ? "show" : "")}>
                                                    {this.state.storeHouseNumberErrorMessage}
                                                </span>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="city">Thành phố</Label>
                                                <Input type="select" name="city" id="city" onChange={this.onSelectCityChange}>
                                                    <option value={null}>Thành phố</option>
                                                    {
                                                        this.state.cities &&
                                                        this.state.cities.map((city, key) => (
                                                            <option key={key} value={city._id}>{city.name}</option>
                                                        ))
                                                    }
                                                </Input>
                                                <span className={"error-message " + (this.state.storeCityErrorMessage ? "show" : "")}>
                                                    {this.state.storeCityErrorMessage}
                                                </span>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="district">Quận</Label>
                                                <Input type="select" name="district" id="district" onChange={this.onSelectDistrictChange}>
                                                    <option value={null}>Quận huyện</option>
                                                    {
                                                        this.state.districts &&
                                                        this.state.districts.map((district, key) => (
                                                            <option key={key} value={district._id}>{district.name}</option>
                                                        ))
                                                    }
                                                </Input>
                                                <span className={"error-message " + (this.state.storeDistrictErrorMessage ? "show" : "")}>
                                                    {this.state.storeDistrictErrorMessage}
                                                </span>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="street">Tên đường</Label>
                                                <Input type="select" name="street" id="street" onChange={this.onSelectStreetsChange}>
                                                    <option value={null}>Tên đường</option>
                                                    {
                                                        this.state.streets &&
                                                        this.state.streets.map((street, key) => (
                                                            <option key={key} value={street._id}>{street.name}</option>
                                                        ))
                                                    }
                                                </Input>
                                                <span className={"error-message " + (this.state.storeStreetErrorMessage ? "show" : "")}>
                                                    {this.state.storeStreetErrorMessage}
                                                </span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email"
                                        id="email" placeholder="Email"
                                        defaultValue={this.props.user.email}
                                        onChange={this.onInputStoreInfoChange}
                                        required={true} />
                                    <span className={"error-message " + (this.state.storeEmailErrorMessage ? "show" : "")}>
                                        {this.state.storeEmailErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone" sm={2}>Số điện thoại</Label>
                                <Col sm={10}>
                                    <Input type="phone" name="phone"
                                        id="phone" placeholder="Số điện thoại"
                                        defaultValue={this.props.user.phone}
                                        onChange={this.onInputStoreInfoChange}
                                        required={true} />
                                    <span className={"error-message " + (this.state.storePhoneErrorMessage ? "show" : "")}>
                                        {this.state.storePhoneErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row className={this.state.hasWebsite ? "" : "hide"}>
                                <Label for="website" sm={2}>Website</Label>
                                <Col sm={10}>
                                    <Input type="text" name="website" id="website"
                                        placeholder="Website"
                                        onChange={this.onInputStoreInfoChange} />
                                    <span className={"error-message " + (this.state.storeWebsiteErrorMessage ? "show" : "")}>
                                        {this.state.storeWebsiteErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="facebook" sm={2}>Facebook</Label>
                                <Col sm={10}>
                                    <Input type="text" name="facebook" id="facebook" placeholder="Facebook" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="youtube" sm={2}>Youtube</Label>
                                <Col sm={10}>
                                    <Input type="text" name="youtube" id="youtube" placeholder="Youtube" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="twitter" sm={2}>Twitter</Label>
                                <Col sm={10}>
                                    <Input type="text" name="twitter" id="twitter" placeholder="Twitter" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="instagram" sm={2}>Instagram</Label>
                                <Col sm={10}>
                                    <Input type="text" name="instagram" id="instagram" placeholder="Instagram" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="googlePlus" sm={2}>Google Plus</Label>
                                <Col sm={10}>
                                    <Input type="text" name="googlePlus" id="googlePlus" placeholder="Google Plus" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="pinterest" sm={2}>Pinterest</Label>
                                <Col sm={10}>
                                    <Input type="text" name="pinterest" id="pinterest" placeholder="Pinterest" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="logo" sm={2}>Logo</Label>
                                <Col sm={10}>
                                    <Input type="file" name="file" id="logo" />
                                    <FormText color="muted">

                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }} style={{ textAlign: "center" }}>
                                    <span className={"error-message2 " + (this.state.addStoreErrorMessage ? "show" : "")}>
                                        {this.state.addStoreErrorMessage}
                                    </span>
                                    <Button type="button" color="warning" onClick={this.onCancelButtonClick}>Hủy</Button>
                                    <Button type="button" color="success" onClick={this.onSubmitButtonClick}>Thêm cửa hàng</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <MessageNotify message={this.state.addStoreResultMessage} />
                    <BuyMoreStoresAlert show={this.state.showBuyMoreStoresAlert} />
                </Container>
            </>
        );
    }
}

export default StoresManage;
