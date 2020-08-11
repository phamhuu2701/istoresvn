import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import "./PhoneActivate.css";

class PhoneActivate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            showSelectWayButtons: true,
            showInputCode: false,
            showSubmitButtons: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.onSelectWayButtonsClick = this.onSelectWayButtonsClick.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            show: nextProps.show,
            phone: nextProps.phone
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    onSelectWayButtonsClick(){
        this.setState({
            showSelectWayButtons: false,
            showInputCode: true,
            showSubmitButtons: true
        })
    }

    render() {
        // console.log(this.state.phone);
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose} className="phone-activate">
                    <Modal.Header closeButton>
                        <Modal.Title>XÁC THỰC SỐ ĐIỆN THOẠI LIÊN HỆ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control className={(this.state.showSelectWayButtons ? "" : "input-bg-grey")} 
                                type="phone" placeholder="Số điện thoại" defaultValue={this.state.phone}/>
                            <Form.Text className="text-muted">
                            Chúng tôi sẽ không chia sẻ số điện thoại của bạn với bất kỳ ai.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={"form-group-buttons-sms-phone " + (this.state.showSelectWayButtons ? "show" : "hide")}>
                            <Button variant="success" type="button" onClick={this.onSelectWayButtonsClick}>
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                <span className="form-btn-title">NHẬN TIN NHẮN</span>
                            </Button>
                            <Button variant="warning" type="button" onClick={this.onSelectWayButtonsClick}>
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                <span className="form-btn-title">NHẬN CUỘC GỌI</span>
                            </Button>
                        </Form.Group>
                        <Form.Group className={(this.state.showInputCode ? "show" : "hide")}>
                            <Form.Label>Nhập mã xác thực</Form.Label>
                            <div className="form-input-activate-code">
                                <Form.Control type="text" placeholder="Mã xác thực" />
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                            </div>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer className={"phone-activate-footer " + (this.state.showSubmitButtons ? "show" : "hide")}>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ĐÓNG
                        </Button>
                        <Button variant="warning" onClick={this.handleClose}>
                            XÁC THỰC
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default PhoneActivate;