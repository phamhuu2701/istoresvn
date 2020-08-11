import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export default class Google extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(data) {
        const user = {
            fullname: {
                firstname: data.profileObj.givenName,
                lastname: data.profileObj.familyName
            },
            email: data.profileObj.email,
            isEmailActivated: true,
            password: 'google' + data.profileObj.googleId,
            avatars: [data.profileObj.imageUrl]
        };

        fetch('/api/login/google', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(result => {
                return result.json();
            })
            .then(user => {
                this.props.loginHandler(user);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <GoogleLogin
                clientId='167843177082-13lcr3s5m9vmlbjagl8ko1qh1jekg8j0.apps.googleusercontent.com'
                buttonText='Google'
                className='btn btn-gplus'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}
