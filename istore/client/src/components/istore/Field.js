import React, { Component } from 'react';
import { Form, Row, Col, Spinner, Pagination } from 'react-bootstrap';

import Cookies from 'js-cookie';

import './Field.css';
import FieldResultsItem from './Field_Results_Item';
import Footer from './Footer';
import { effectOnSearchProduct } from './ProductInformation';
import { findRecentProducts } from './Maps';
import { onSortStoreListService } from '../../services/store.service';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            query: ''
        };
        this.autocompleteInput = React.createRef();
        this.onEnterProduct = this.onEnterProduct.bind(this);
        this.onClickSearchProduct = this.onClickSearchProduct.bind(this);
        this.findRecentProductHandler = this.findRecentProductHandler.bind(
            this
        );
    }

    onEnterProduct(e) {
        //onChangeSearchAddress(e.target.value);
        if (e.which === 13 || e.which === 10) {
            // Find product
            const search = e.target.value;
            if (search !== '') {
                const distance = document.querySelector(
                    'select[class="form-control"]'
                ).value;
                effectOnSearchProduct(search, distance, result => {
                    if (result.length > 0) {
                        this.props.onZoom('in');
                    } else this.props.onZoom('normal');
                    this.props.findProductHandler(result);
                });
            } else {
                this.findRecentProductHandler();
            }
        } else {
            //this.handleScriptLoad();
            //onPlaceAutocomplete(this.autocompleteInput.current)
        }
    }

    onClickSearchProduct() {
        // Find product
        const search = this.autocompleteInput.current.value;
        const distance = document.querySelector('select[class="form-control"]')
            .value;
        effectOnSearchProduct(search, distance, result => {
            if (result.length > 0) {
                this.props.onZoom('in');
            } else this.props.onZoom('normal');
            this.props.findProductHandler(result);
        });
    }

    findRecentProductHandler() {
        // Show recent products if existing
        const recentProducts = Cookies.get('recentProducts');
        document.querySelector('.loading').style.display = 'block';
        findRecentProducts(recentProducts, result => {
            if (result.length > 0) {
                this.props.onZoom('in');
            } else this.props.onZoom('normal');
            this.props.findProductHandler(result, false);
        });
    }

    componentDidMount() {
        /*setTimeout(()=>{
            onSearchProduct("điện thoại", 10000, result => {
                this.props.findProductHandler(result);
            });
        }, 2000);*/
        // setTimeout(() => {
        //     onPlaceAutocomplete(this.autocompleteInput.current, (addressObject) => {
        //         //this.props.onPlaceLoaded(addressObject);
        //         const address = addressObject.address_components;
        //         if (address){
        //             this.setState({
        //                 city: address[0].long_name,
        //                 query: addressObject.formatted_address
        //             })
        //         }
        //     })
        // }, 2000);
        setTimeout(() => {
            this.findRecentProductHandler();
        }, 1000);
    }

    render() {
        return (
            <Form.Group className='field-filter-form-group-search field-filter-form-group-search-custom'>
                <img
                    alt='Tìm cửa hàng'
                    src='./resources/icons/search.svg'
                    onClick={this.onClickSearchProduct}
                ></img>
                <div>
                    <Form.Control
                        ref={this.autocompleteInput}
                        id='autocomplete'
                        onKeyPress={this.onEnterProduct}
                        type='text'
                        placeholder='Nhập tên sản phẩm...'
                        className='field-filter-form-input-search'
                        defaultValue={this.state.query}
                    />
                </div>
            </Form.Group>
        );
    }
}

export class ResultArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            allProducts: [],
            pages: [],
            currentPage: 1,
            message: '',
            cared: false
        };
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    previousPage() {
        this.setState({
            result: this.state.allProducts.slice(
                this.state.currentPage * 5 - 10,
                this.state.currentPage * 5 - 5
            ),
            currentPage: this.state.currentPage - 1
        });
    }

    nextPage() {
        this.setState({
            result:
                this.state.allProducts.length > this.state.currentPage * 5 - 5
                    ? this.state.allProducts.slice(
                          this.state.currentPage * 5,
                          this.state.currentPage * 5 + 5
                      )
                    : this.state.allProducts.slice(
                          this.state.currentPage * 5,
                          this.state.allProducts % 5
                      ),
            currentPage: this.state.currentPage + 1
        });
    }

    goToPage(page) {
        this.setState({
            result:
                this.state.allProducts.length > page * 5 - 5
                    ? this.state.allProducts.slice(page * 5 - 5, page * 5)
                    : this.state.allProducts.slice(
                          page * 5 - 5,
                          page * 5 - 5 + (this.state.allProducts % 5)
                      ),
            currentPage: page
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFound === true) {
            let pagenum = Math.ceil(nextProps.result.length / 5);
            let pages = [];
            while (pagenum > 0) {
                pages.unshift(--pagenum);
            }
            this.setState({
                allProducts: nextProps.result,
                pages: pages
            });
            const products = [];
            if (nextProps.result.length > 5) {
                for (let i = 0; i < 5; i++) {
                    products.push(nextProps.result[i]);
                }
            } else {
                products.push(...nextProps.result);
            }

            // Display require form
            if (nextProps.result.length === 0) {
                // Check logged in
                if (
                    nextProps.checkLoggedIn() &&
                    nextProps.interests < 3 &&
                    this.state.cared === false
                ) {
                    const searchContent = prompt(
                        'Sản phẩm bạn muốn không được tìm thấy! Nhập tên sản phẩm nếu bạn muốn nhận thông báo khi có?',
                        document.querySelector('#autocomplete').value
                    );

                    if (searchContent) {
                        // Add a new interest into user and update current user
                        fetch('/api/users/updateInterest', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ searchContent })
                        })
                            .then(result => {
                                if (result.status === 200) {
                                    this.setState({
                                        interests: +this.state.interests + 1
                                    });
                                    alert(
                                        'OK. Bạn sẽ nhận mail nếu có sản phẩm thích hợp!'
                                    );
                                }
                            })
                            .catch(err => console.log(err));
                    }
                    this.setState({
                        cared: true
                    });
                }
            }

            // push product into result
            this.setState({
                result: products,
                message: 'Không tìm thấy sản phẩm!'
            });
        } else {
            this.setState({
                result: nextProps.result,
                message: 'Chưa có sản phẩm được xem!'
            });
        }
    }

    render() {
        if (this.state.result.length > 0) {
            return (
                <div className='field-results-list'>
                    {this.state.result.map((res, index) => {
                        return (
                            <FieldResultsItem
                                key={index}
                                code={index}
                                info={res}
                                storeName={res.store.name}
                                imageAvatar={res._doc.images[0]}
                                price={res._doc.price}
                                saleoff={res._doc.saleoff}
                                phone={res.store.phone}
                                productName={res._doc.name}
                                distance={res.distance}
                            />
                        );
                    })}
                    <Pagination>
                        <Pagination.Prev
                            disabled={this.state.currentPage === 1}
                            onClick={this.previousPage}
                        />
                        {this.state.pages.map(v => {
                            return (
                                <Pagination.Item
                                    key={v}
                                    active={this.state.currentPage === v + 1}
                                    onClick={() => {
                                        this.goToPage(v + 1);
                                    }}
                                >
                                    {v + 1}
                                </Pagination.Item>
                            );
                        })}
                        <Pagination.Next
                            disabled={
                                this.state.currentPage >=
                                this.state.pages.length
                            }
                            onClick={this.nextPage}
                        />
                    </Pagination>
                </div>
            );
        } else {
            return (
                <div className='field-results-list'>{this.state.message}</div>
            );
        }
    }
}

export default class Fields extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            isFound: false
        };

        this.onDistanceSelectChange = this.onDistanceSelectChange.bind(this);
        this.onPrioritySelectChange = this.onPrioritySelectChange.bind(this);
        this.findProductHandler = this.findProductHandler.bind(this);
    }

    onDistanceSelectChange(e) {
        const search = document.querySelector('#autocomplete').value;
        const distance = e.target.value;
        if (search) {
            effectOnSearchProduct(search, distance, result => {
                if (result.length > 0) {
                    this.props.onZoom('in');
                } else this.props.onZoom('normal');
                this.findProductHandler(result);
            });
        }
    }

    onPrioritySelectChange(e) {
        // Do somthing
        onSortStoreListService(this.state.result, e.target.value, result => {
            document.querySelector('.loading').style.display = 'none';
            this.findProductHandler(result);
        });
    }

    findProductHandler(result, isFound = true) {
        this.setState({
            result: result,
            isFound: isFound
        });
    }

    render() {
        return (
            <div className='field scroll square scrollbar-dusty-grass square thin'>
                <div className='field-filter'>
                    <Row>
                        <Col>
                            <SearchBar
                                findProductHandler={this.findProductHandler}
                                onZoom={this.props.onZoom}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className='field-filter-form-label'>
                                Bán kính
                            </label>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as='select'
                                    onChange={this.onDistanceSelectChange}
                                    defaultValue={10000}
                                >
                                    <option value={1000}>1 km</option>
                                    <option value={2000}>2 km</option>
                                    <option value={5000}>5 km</option>
                                    <option value={10000}>10 km</option>
                                    <option value={15000}>15 km</option>
                                    <option value={20000}>20 km</option>
                                    <option value={40000}>40 km</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
                <hr className='field-hr' />
                <div className='field-results'>
                    <Row>
                        <Col className='field-results-title'>
                            <span className='field-results-number'>
                                Đã xem gần đây
                            </span>
                        </Col>
                        <Col className='field-results-filter'>
                            <Form.Group>
                                <Form.Control
                                    as='select'
                                    onChange={this.onPrioritySelectChange}
                                >
                                    <option value={0}>Phổ biến nhất</option>
                                    <option value={1}>Gần nhất</option>
                                    <option value={2}>Giá tăng dần</option>
                                    <option value={3}>Giá giảm dần</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className='loading'>
                        <Spinner animation='grow' variant='success' size='sm' />
                        <Spinner animation='grow' variant='success' size='sm' />
                        <Spinner animation='grow' variant='success' size='sm' />
                    </div>
                    <ResultArea
                        ref={this.findProductRef}
                        result={this.state.result}
                        isFound={this.state.isFound}
                        onZoom={this.props.onZoom}
                        checkLoggedIn={this.props.checkLoggedIn}
                        interests={this.props.interests}
                    />
                </div>
                <hr className='field-hr' />
                <Footer />
            </div>
        );
    }
}
