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
// import { Link } from "react-router-dom";
// core components
import Header from "components/user/components/Headers/Header.jsx";
import { getStoresBySizeByIdUser } from "../../../../services/user.service";
import "./StoresProductsManage.css";

import MessageNotify from "../../../istore/MessageNotify";
import { getStoreById } from "../../../../services/store.service";
import { sortDescreaseProductsByTimestamp } from "../../../../utils/productUtils";
import { getProductCategories } from "../../../../services/productCategory.service";
import removeAccents from "../../../../utils/stringUtils";
import priceFormatUtil from "../../../../utils/priceFormat";
import { Link } from "react-router-dom";

class StoresProductsManage extends React.Component {
    constructor(props) {
        super(props);

        this.storeIdRef = React.createRef();
        this.productCategoryRef = React.createRef();
        this.productNameRef = React.createRef();
        this.productDecriptionRef = React.createRef();
        this.productPriceRef = React.createRef();
        this.productProducerCodeRef = React.createRef();
        this.productSaleOffRef = React.createRef();
        this.filesRef = React.createRef();

        this.state = {
            stores: [],
            storeMain: null,
            products: [],
            productMain: null,

            isShowProductInfoInput: false,

            productCategories: [],

            productCategoryInput: null,
            productNameInput: "",
            productDescriptionInput: "",
            productPriceInput: 0,
            productSaleoffInput: 0,

            productCategoryErrorMessage: "",
            productNameErrorMessage: "",
            productDescriptionErrorMessage: "",
            productPriceErrorMessage: "",
            productSaleoffErrorMessage: "",

            addProductResultMessage: ""
        }

        this.onStoresSelectChange = this.onStoresSelectChange.bind(this);
        this.onButtonAddProductClick = this.onButtonAddProductClick.bind(this);
        this.onSelectProductCategoriesChange = this.onSelectProductCategoriesChange.bind(this);
        this.onInputProductInfoChange = this.onInputProductInfoChange.bind(this);
        this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        this.setState({
            stores: getStoresBySizeByIdUser(this, this.props.user._id, 0, 10)
        })

        getProductCategories(this);
    }

    onStoresSelectChange(e) {
        const id = e.target.value;

        getStoreById(id, (result) => {
            if(result.products.length < 1){
                alert("Cửa hàng chưa có sản phẩm nào. Hãy thêm ít nhất một sản phẩm vào cửa hàng!")
            }

            this.setState({
                storeMain: result,
                products: (result ? sortDescreaseProductsByTimestamp(result.products) : null)
            })
        })
    }

    onButtonAddProductClick() {
        if (this.state.storeMain) {
            this.setState({
                isShowProductInfoInput: true
            })
        }
    }

    onSelectProductCategoriesChange(e) {
        const key = e.target.value;
        // console.log(this.state.productCategories[key]);

        this.setState({
            productCategoryInput: this.state.productCategories[key],
            productCategoryErrorMessage: ""
        })
    }

    onInputProductInfoChange(e) {
        // console.log(e.target.id + " - " + e.target.value);
        if (e.target.id === "name") {
            this.setState({
                productNameInput: e.target.value,
                productNameErrorMessage: ""
            })
        }
        if (e.target.id === "description") {
            this.setState({
                productDescriptionInput: e.target.value,
                productDescriptionErrorMessage: ""
            })
        }
        if (e.target.id === "price") {
            this.setState({
                productPriceInput: e.target.value,
                productPriceErrorMessage: ""
            })
        }
        if (e.target.id === "saleoff") {
            this.setState({
                productSaleoffInput: e.target.value,
                productSaleoffErrorMessage: ""
            })
        }

    }

    onCancelButtonClick() {
        window.location.reload();
    }

    onSubmitButtonClick() {
        if (!this.state.productCategory) {
            this.setState({
                productCategoryErrorMessage: "Phân loại sản phẩm không được để trống."
            })
        }
        if (!this.state.productNameInput) {
            this.setState({
                productNameErrorMessage: "Tên sản phẩm không được để trống."
            })
        }
        if (!this.state.productPriceInput) {
            this.setState({
                productPriceErrorMessage: "Giá sản phẩm không được để trống."
            })
        }
        if (!this.state.productDescriptionInput) {
            this.setState({
                productDescriptionErrorMessage: "Mô tả sản phẩm không được để trống."
            })
        }

        const product = {
            store: this.state.storeMain,
            productCategory: this.state.productCategoryInput,
            name: this.state.productNameInput,
            description: this.state.productDescriptionInput,
            price: this.state.productPriceInput,
            saleoff: this.state.productSaleoffInput,
            nameRemoveAccents: removeAccents(this.state.productNameInput)
        }

        console.log(product);
        // save product
    }

    addProduct(e) {
        e.preventDefault();
        const productInfo = {
            storeId: this.storeIdRef.current.value,
            productCategory: this.productCategoryRef.current.value,
            productName: this.productNameRef.current.value,
            productDecription: this.productDecriptionRef.current.value,
            productPrice: this.productPriceRef.current.value,
            productProducerCode: this.productProducerCodeRef.current.value,
            productSaleOff: this.productSaleOffRef.current.value,
            files: this.filesRef.current.files
        }

        const formData = new FormData();
        formData.append('storeId', productInfo.storeId);
        formData.append('productCategory', productInfo.productCategory);
        formData.append('productName', productInfo.productName);
        formData.append('productDecription', productInfo.productDecription);
        formData.append('productPrice', productInfo.productPrice);
        formData.append('productProducerCode', productInfo.productProducerCode);
        formData.append('productSaleOff', productInfo.productSaleOff);

        // User multiple files with FormData
        // To check files use: formData.getAll('fieldName')
        Array.from(productInfo.files).forEach(file => {
            formData.append('files', file);
        })

        fetch('/api/products', {
            method: 'POST',
            body: formData
        })
        .then(result => {
            if (result.status === 200) {

                this.setState({
                    addProductResultMessage: "Thêm sản phẩm thành công!",
                    isShowProductInfoInput: false
                })

                // alert('Đã thêm 1 sản phẩm!');
                // Reset form
                document.querySelector('#addProductForm').reset();

                getStoreById(this.state.storeMain._id, (result) => {
                    this.setState({
                        storeMain: result,
                        products: (result ? sortDescreaseProductsByTimestamp(result.products) : null)
                    })
                })
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="stores-manage" fluid={true}>
                    {/* Table */}
                    <Row className="mt-5">
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="stores">Chọn cửa hàng</Label>
                                    <Input type="select" name="stores" id="stores" onChange={this.onStoresSelectChange}>
                                        <option value={null}>Cửa hàng</option>
                                        {
                                            this.state.stores && this.state.stores.map((store, key) => (
                                                <option key={key} value={store._id}>{store.name}</option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    {/* Button Add Store */}
                    <Row>
                        <Col className="container-button-add-store">
                            <Button onClick={this.onButtonAddProductClick} className="btn btn-success">Thêm sản phẩrm</Button>
                        </Col>
                    </Row>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Danh sách sản phẩm</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush table-flush-custom" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Giá gốc (VND)</th>
                                            <th scope="col">Khuyến mãi (%)</th>
                                            <th scope="col">Lượt xem</th>
                                            <th scope="col">Còn hàng</th>
                                            <th scope="col" style={{"textAlign": "center"}}><i className="fas fa-ellipsis-v" /></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {
                                            this.state.products &&
                                            this.state.products.map((product, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <th scope="row" style={{ "textTransform": "uppercase" }}>
                                                        <Link to={
                                                                "/store/" +
                                                                this.state.storeMain.template +
                                                                "/" +
                                                                this.state.storeMain._id +
                                                                "/products/" +
                                                                product._id
                                                            }
                                                            target="_blank"
                                                        >
                                                            {product.name.substring(0, 25)}
                                                        </Link>
                                                    </th>
                                                    <td>{priceFormatUtil(product.price)}</td>
                                                    <td>{product.saleoff}%</td>
                                                    <td>{product.viewsCount.length}</td>
                                                    <td>
                                                        <Badge color="" className="badge-dot mr-4">
                                                            <span className="is-active-true"><i className="bg-success" />Còn hàng</span>
                                                        </Badge>
                                                    </td>
                                                    <td style={{"textAlign": "center"}}>
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
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
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
                    <hr />
                    <div className={"store-info-input " + (this.state.isShowProductInfoInput ? "show" : "hide")}>
                        <h3>THÔNG TIN SẢN PHẨM</h3>
                        <hr />
                        <Form id='addProductForm' onSubmit={this.addProduct}>
                            <FormGroup row>
                                <Label for="" sm={2}>Loại cửa hàng</Label>
                                <Col sm={10}>
                                    <Input type="text"
                                        name=""
                                        id=""
                                        defaultValue={this.state.storeMain && this.state.storeMain.storeCategory.name}
                                        required={true}
                                        readOnly={true} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="store" sm={2}>Cửa hàng</Label>
                                <Col sm={10}>
                                    <Input type="text"
                                            name="storeId"
                                            innerRef={this.storeIdRef}
                                            defaultValue={this.state.storeMain && this.state.storeMain._id}
                                            required={true}
                                            hidden={true}
                                            readOnly={true} />
                                    <Input type="text"
                                        name="store"
                                        id="store"
                                        defaultValue={this.state.storeMain && this.state.storeMain.name}
                                        required={true}
                                        readOnly={true} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="storeCategory" sm={2}>Phân loại</Label>
                                <Col sm={10}>
                                    <Input type="select" name="storeCategory" id="storeCategory"
                                        required={true}
                                        innerRef={this.productCategoryRef}
                                        onChange={this.onSelectProductCategoriesChange}
                                        defaultValue={1}>
                                        <option value={null}>Phân loại</option>
                                        {
                                            this.state.productCategories &&
                                            this.state.productCategories.map((productCategory, key) => (
                                                <option key={key} value={productCategory._id}>{productCategory.name}</option>
                                            ))
                                        }
                                    </Input>
                                    <span className={"error-message " + (this.state.productCategoryErrorMessage ? "show" : "")}>
                                        {this.state.productCategoryErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={2}>Tên sản phẩm</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name"
                                        placeholder="Tên sản phẩm"
                                        innerRef={this.productNameRef}
                                        onChange={this.onInputProductInfoChange}
                                        required={true} />
                                    <span className={"error-message " + (this.state.productNameErrorMessage ? "show" : "")}>
                                        {this.state.productNameErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={2}>Mã sản phẩm</Label>
                                <Col sm={10}>
                                    <Input type="text" name="producerCode" id="producerCode"
                                        placeholder="Mã sản phẩm của nhà sản xuất"
                                        innerRef={this.productProducerCodeRef}
                                        required={true} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={2}>Giới thiệu</Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                        placeholder="Hãy giới thiệu về sản phẩm.."
                                        innerRef={this.productDecriptionRef}
                                        onChange={this.onInputProductInfoChange} 
                                        required={true} />
                                    <span className={"error-message " + (this.state.productDescriptionErrorMessage ? "show" : "")}>
                                        {this.state.productDescriptionErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={2}>Giá gốc (VND)</Label>
                                <Col sm={4}>
                                    <Input type="number" name="price"
                                        id="price" placeholder="Giá gốc"
                                        innerRef={this.productPriceRef}
                                        onChange={this.onInputProductInfoChange}
                                        required={true} />
                                    <span className={"error-message " + (this.state.productPriceErrorMessage ? "show" : "")}>
                                        {this.state.productPriceErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="saleoff" sm={2}>Khuyến mãi (%)</Label>
                                <Col sm={4}>
                                    <Input type="number" name="saleoff"
                                        id="saleoff" placeholder="Khuyến mãi"
                                        required={true}
                                        defaultValue={0}
                                        innerRef={this.productSaleOffRef}
                                        onChange={this.onInputProductInfoChange}
                                        min={0}
                                        max={100} />
                                    <span className={"error-message " + (this.state.productSaleoffErrorMessage ? "show" : "")}>
                                        {this.state.productSaleoffErrorMessage}
                                    </span>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="images" sm={2}>Hình ảnh</Label>
                                <Col sm={10}>
                                    <Input innerRef={this.filesRef} type="file" name="images" id="images" accept='image/*' required={true} multiple={true}/>
                                    <FormText color="muted">
                                        Tối đa 10 ảnh.
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }} style={{ textAlign: "center" }}>
                                    <span className={"error-message2 " + (this.state.addProductErrorMessage ? "show" : "")}>
                                        {this.state.addProductErrorMessage}
                                    </span>
                                    <Button type="reset" color="warning">Viết lại</Button>
                                    <Button type="submit" color="success">Thêm sản phẩm</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <MessageNotify message={this.state.addProductResultMessage} />
                </Container>
            </>
        );
    }
}

export default StoresProductsManage;
