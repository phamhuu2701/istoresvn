import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import "./PhoneActivate.css";
import { getUserLogged, getStoresByIdUser2 } from '../../../../services/user.service';
import { Link } from 'react-router-dom';

class BuyMoreStoresAlert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            user: null,
            message: ""
        }

        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        getUserLogged(result => {

            if (result) {
                getStoresByIdUser2(result.user._id, stores => {
                    if (stores.length > 1) {
                        this.setState({
                            user: result.user,
                            message: "Bạn chỉ có thể tạo tối đa " + result.user.maxStoresCountCreated.count + " cửa hàng"
                        })
                    }
                    else {
                        this.setState({
                            user: result.user,
                            message: "Bạn chỉ có thể tạo miễn phí 1 cửa hàng"
                        })
                    }
                })
            }
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({
                show: true
            })
        }
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose} className="phone-activate">
                    <Modal.Header closeButton>
                        <Modal.Title>THÔNG BÁO!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.message}</p>
                    </Modal.Body>
                    <Modal.Footer className={"phone-activate-footer show"}>
                        <Button variant="" onClick={this.handleClose}>
                            ĐÓNG
                        </Button>
                        <Link to="more-stores">                            
                            <Button variant="warning">
                                MUA GÓI CỬA HÀNG
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default BuyMoreStoresAlert;