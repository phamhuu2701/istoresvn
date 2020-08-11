import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

import './VerifyIndex.css';

export default class VerifyIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Đang xử lý yêu cầu ',
            statusNotify: '',
            timeout: 3
        };
    }

    componentWillMount() {
        const userId = this.props.match.params.userId;
        const interestId = this.props.match.params.interestId;
        fetch(`/api/users/cancelNotify?id=${userId}&interestId=${interestId}`, {
            method: 'PUT'
        })
            .then(result => {
                if (result.status === 200) {
                    this.setState({
                        statusNotify: 'status-success'
                    });
                } else if (result.status === 201) {
                    this.setState({
                        statusNotify: 'status-warning'
                    });
                } else {
                    this.setState({
                        statusNotify: 'status-danger'
                    });
                }
                return result.json();
            })
            .then(mes => {
                this.setState({
                    message: mes
                });
                let i = 3;
                setInterval(() => {
                    if (i === 0) {
                        this.setState({
                            message: 'Đang chuyển đến trang chủ ',
                            statusNotify: ''
                        });
                        window.location.href = 'https://localhost:3000';
                    } else {
                        this.setState({
                            timeout: i--
                        });
                    }
                }, 1000);
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.state.statusNotify) {
            return (
                <div className='verify'>
                    <div className='verify-box'></div>
                    <div className='verify-content'>
                        <h2 className={this.state.statusNotify}>
                            {this.state.message}
                        </h2>
                        <h5>
                            Bạn sẽ trở lại trang chủ trong {this.state.timeout}{' '}
                            giây nữa!
                        </h5>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='verify'>
                    <div className='verify-box'></div>
                    <div className='verify-content'>
                        <h2 className={this.state.statusNotify}>
                            {this.state.message}
                        </h2>
                        <h2>
                            <Spinner animation='grow' size='sm' />
                            <Spinner animation='grow' size='sm' />
                            <Spinner animation='grow' size='sm' />
                        </h2>
                    </div>
                </div>
            );
        }
    }
}
