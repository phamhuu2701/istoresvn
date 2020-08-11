import React, { Component } from 'react';

import { FacebookProvider, LoginButton } from 'react-facebook';

import './Information.css'

export default class Information extends Component {
	/*constructor(props) {
		super(props);
	}*/

	componentDidUpdate() {
		// console.log(this.props.isLoggedIn);
		/*if (this.props.isLoggedIn === false) {
			alert('You had not logged in yet!')
			window.location = 'http://localhost:3000'
		}*/
	}

	handleResponse(data) {
	    // console.log(data);
	}
	 
	handleError(error) {
	    this.setState({ error });
	}

	render() {
		return (
			<div className='information'>
		        <FacebookProvider appId="984029191952495">
			        <LoginButton
			          scope="email"
			          onCompleted={this.handleResponse}
			          onError={this.handleError}
			        >
			          <span>Login via Facebook</span>
			        </LoginButton>
			    </FacebookProvider>
            </div>	
		)	
	}
}