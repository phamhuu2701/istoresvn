import React, { Component } from 'react';
import { Alert } from "react-bootstrap";

import './MessageNotify.css';

export default class MessageNotify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: 'animate-box',
			message: ''
		}
	}

	UNSAFE_componentWillMount() {
		if (this.state.message) {
			this.setState({
				show: 'animated bounceInUp',
				message: this.props.message
			})
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.message) {
			this.setState({
				show: 'animated bounceInUp',
				// message: nextProps.message + ' Vui lòng kiểm tra <a href="https://mail.google.com/" target="_blank">mail</a> để xác thực!'
				message: nextProps.message
			})

			setTimeout(()=> {
				this.setState({
					show: 'animated bounceOutDown'
				})
			}, 4000);
			setTimeout(() => {
				this.setState({
					show: 'animate-box'
				})
			}, 5000)
		}
	}

	render() {
		return (
			<div className={'success-feedback ' + this.state.show}>
				<Alert variant='success' className="abc"><span dangerouslySetInnerHTML={{__html: this.state.message}}></span></Alert>
			</div>
		);
	}
}
