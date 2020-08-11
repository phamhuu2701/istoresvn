import React, { Component } from "react";
//import FacebookLogin from 'react-facebook-login';
import { FacebookProvider, LoginButton } from "react-facebook";

export default class facebook extends Component {
    constructor(props) {
        super(props);
        this.handleResponse = this.handleResponse.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            if (document.querySelector("#fb-root")) {
                document.querySelector("#fb-root").remove();
                document.querySelector('body').style.overflowY = 'auto';
            }
        }, 300);
    }

    handleResponse(data) {
        const user = {
            fullname: {
                firstname: data.profile.first_name,
                lastname: data.profile.last_name
            },
            email: data.profile.email,
            isEmailActivated: true,
            password: "facebook" + data.profile.id,
            avatars: [data.profile.picture.data.url]
        };

        fetch("/api/login/facebook", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
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

    handleError(error) {
        console.log(error);
    }

    render() {
        return (
            <FacebookProvider appId="984029191952495">
                <LoginButton
                    scope="email"
                    onCompleted={this.handleResponse}
                    onError={this.handleError}
                    className="btn btn-fb"
                >
                    <span>
                        <img
                            src="./resources/icons/facebook.svg"
                            height="24px"
                            alt="Login Via Facebook"
                        />{" "}
                        Facebook
                    </span>
                </LoginButton>
            </FacebookProvider>
        );
    }
}
