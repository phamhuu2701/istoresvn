import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import "./PhoneAdd.css";
import { updateUserPhone } from '../../../../services/user.service';

class PhoneAdd extends Component {
    constructor(props) {
        super(props); // {show}

        this.state = {
            show: props.show,
            user: props.user,
            inputPhoneErrorMessage: ""
        }

        this.inputPhoneRef = React.createRef();

        this.handleClose = this.handleClose.bind(this);
        this.onInputPhoneChange = this.onInputPhoneChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            show: nextProps.show,
            user: nextProps.user
        })
    }

    handleClose(e) {
        let value = false;
        try {
            value = (e.target.value === "true" ? true : false);
        } catch (error) {
            value = false;
        }
        // console.log(value);

        // true
        if(value === true){
            if(!this.inputPhoneRef.current.value){
                this.setState({
                    inputPhoneErrorMessage: "Số điện thoại không được để trống."
                })
            }
            else{
                // update phone into user
                updateUserPhone(this.props.user._id, this.inputPhoneRef.current.value, (resultUpdate) => {
                    // console.log("resultUpdate: ", resultUpdate);
                    if(resultUpdate){            
                        this.setState({
                            show: false,
                            inputPhoneErrorMessage: ""
                        });
                        this.props.handeResultPhoneAdd(resultUpdate.phone);
                    }
                    else{            
                        this.setState({
                            inputPhoneErrorMessage: "Cập nhập số điện thoại thất bại. Vui lòng thử lại."
                        });
                    }
                })
                
            }
        }
        else{            
            this.setState({
                show: false,
                inputPhoneErrorMessage: ""
            });
            this.props.handeResultPhoneAdd("");
        }
    }

    onInputPhoneChange(){
        this.setState({
            inputPhoneErrorMessage: ""
        })
    }

    render() {
        // console.log(this.state.phone);
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose} className="phone-add">
                    <Modal.Header closeButton>
                        <Modal.Title>CUNG CẤP SỐ ĐIỆN THOẠI LIÊN HỆ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="phone" placeholder="Số điện thoại" 
                                onChange={this.onInputPhoneChange}
                                maxLength={10}
                                ref={this.inputPhoneRef}/>
                            <div className={"error-message " + (this.state.inputPhoneErrorMessage ? "" : "hide")}>
                            {this.state.inputPhoneErrorMessage}
                            </div>
                            <Form.Text className="text-muted">
                            Chúng tôi sẽ không chia sẻ số điện thoại của bạn với bất kỳ ai.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button value={false} variant="warning" onClick={this.handleClose}>
                            ĐÓNG
                        </Button>
                        <Button value={true} variant="success" onClick={this.handleClose}>
                            XÁC THỰC
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default PhoneAdd;