import { getNewArrayBySize } from '../utils/arrayUtils';
import { getAvgRatesStore, getStoreViewsCount } from './store.service';

export function LoginByLocalService(e, loginHandler, that) {
    e.preventDefault();
    const emailInput = e.target.childNodes[0].childNodes[0];
    const passwordInput = e.target.childNodes[1].childNodes[0];
    const email = emailInput.value;
    const password = passwordInput.value;
    emailInput.style.borderColor = '#ced4da';
    passwordInput.style.borderColor = '#ced4da';

    fetch('/api/login/local', {
        method: 'POST',
        headers: {
            Accept: 'application',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(result => {
            if (result.status === 200) {
                that.setState({
                    errorLogin: ''
                });
            } else if (result.status === 201) {
                that.setState({
                    errorLogin: 'Email hoặc mật khẩu không đúng!'
                });
            } else {
                that.setState({ errorLogin: 'Tài khoản chưa xác thực!' });
            }
            return result.json();
        })
        .then(res => {
            if (res && res.isLogged === true) {
                loginHandler(res.user);
            } else {
                emailInput.style.borderColor = 'red';
                passwordInput.style.borderColor = 'red';
            }
        })
        .catch(err => console.log(err));
}

export function SignUpByLocalService(e, that) {
    e.preventDefault();
    if (
        that.state.checkFirstname &&
        that.state.checkLastname &&
        that.state.checkEmail &&
        that.state.checkPhone &&
        that.state.checkPassword &&
        that.state.checkPasswordConfirm
    ) {
        const userInfo = {
            fullname: {
                firstname: e.target.childNodes[1].childNodes[0].value,
                lastname: e.target.childNodes[2].childNodes[0].value
            },
            email: e.target.childNodes[3].childNodes[0].value,
            phone: e.target.childNodes[4].childNodes[0].value,
            password: e.target.childNodes[5].childNodes[0].value
        };

        fetch(`/api/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(result => {
                return result.json();
            })
            .then(res => {
                if (res.err) {
                    // Error
                    that.setState({
                        feedback: 'error',
                        feedbackContent: res.err,
                        checkEmail: 'invalid',
                        checkPhone: 'invalid'
                    });
                } else {
                    // Success
                    that.setState({
                        sign: 'in',
                        feedback: '',
                        feedbackContent: ''
                    });
                    that.props.successSignUpHandler(res.message);
                }
            })
            .catch(err => console.log(err));
    } else {
        that.setState({
            checkFirstname: that.state.checkFirstname
                ? that.state.checkFirstname
                : 'invalid',
            checkEmail: that.state.checkEmail
                ? that.state.checkEmail
                : 'invalid',
            checkPhone: that.state.checkPhone
                ? that.state.checkPhone
                : 'invalid',
            checkPassword: that.state.checkPassword
                ? that.state.checkPassword
                : 'invalid',
            checkPasswordConfirm: that.state.checkPasswordConfirm
                ? that.state.checkPasswordConfirm
                : 'invalid'
        });
    }
}

export function LogOutService(that) {
    fetch('/api/logout', {
        method: 'GET'
    })
        .then(result => {
            if (result.status === 200) {
                that.setState({
                    isLogged: false,
                    user: null,
                    sign: ''
                });
                that.props.logInToggle(false);
                document.getElementById('dropdown-user-body').style.display =
                    'none';
            } else {
                alert('Đã có lỗi!!!');
            }
        })
        .catch(err => console.log(err));
}

export async function ForgotPasswordService(that) {
    if (that.state.emailValue) {
        that.setState({
            showLoading: 'show'
        });
        // Update new password
        const token = that.forgotPassword_TokenRef.current.value;
        const password = that.forgotPassword_PasswordRef.current.value;
        const repassword = that.forgotPassword_rePasswordRef.current.value;
        if (password !== repassword) {
            alert('Mật khẩu nhập lại không chính xác!');
        } else {
            fetch('/api/users/forgotpassword-' + that.state.emailValue, {
                method: 'PUT',
                headers: {
                    Accept: 'application',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, password: password })
            })
                .then(result => {
                    that.setState({
                        showLoading: ''
                    });
                    if (result.status === 200) {
                        // Update new password successfully
                        that.setDefaultEmailValue(false);
                        return result.json();
                    } else {
                        // Failed
                        return result.json();
                    }
                })
                .then(res => {
                    if (res.err) {
                        that.setState({
                            errorForgotPassword: res.err
                        });
                    } else {
                        // Show massage
                        //alert()
                        that.props.successSignUpHandler(
                            'Lấy lại mật khẩu thành công!'
                        );
                    }
                })
                .catch(err => console.log(err));
        }
    } else {
        const email = that.forgotPassword_EmailRef.current.value;
        that.setState({
            showLoading: 'show'
        });
        await ValidateInputService('email', email, that);
        if (that.state.checkEmail === 'valid') {
            // Check email in database
            fetch('/api/users/forgotpassword-' + email, {
                method: 'GET'
            })
                .then(result => {
                    that.setState({
                        showLoading: ''
                    });
                    if (result.status === 200) {
                        return result.json();
                    } else if (result.status === 201) {
                        that.setState({
                            errorForgotPassword: '*Email không trùng khớp!'
                        });
                    } else {
                        return result.json();
                    }
                })
                .then(res => {
                    if (res.isMatch) {
                        // Show new password and token input
                        that.setState({
                            forgotPasswordNotify:
                                'Hãy kiểm tra email để lấy Token!',
                            errorForgotPassword: '',
                            confirmForgotPasswordValue: 'Cập nhật',
                            emailValue: email
                        });
                    } else {
                        that.setState({
                            errorForgotPassword: res.err
                        });
                    }
                });
        } else {
            that.setState({
                errorForgotPassword: 'Vui lòng nhập đúng định dạng email!'
            });
        }
    }
}

export function ValidateInputService(key, value, that) {
    // Check something
    switch (key) {
        case 'firstname':
            // Check length
            if (value.length < 3) {
                that.setState({
                    checkFirstname: 'invalid'
                });
            } else {
                that.setState({
                    checkFirstname: 'valid'
                });
            }
            break;
        case 'lastname':
            // Check length
            if (value.length < 3) {
                that.setState({
                    checkLastname: 'invalid'
                });
            } else {
                that.setState({
                    checkLastname: 'valid'
                });
            }
            break;
        case 'email':
            // Check contain @
            if (value.includes('@') && value.length > 12) {
                that.setState({
                    checkEmail: 'valid'
                });
            } else {
                that.setState({
                    checkEmail: 'invalid'
                });
            }
            break;
        case 'phone':
            // Check length and start with 0xxx
            if (value.length < 10 || !value.startsWith('0')) {
                that.setState({
                    checkPhone: 'invalid'
                });
            } else {
                that.setState({
                    checkPhone: 'valid'
                });
            }
            break;
        case 'password':
            // Check length
            if (value.length < 3) {
                that.setState({
                    checkPassword: 'invalid'
                });
            }
            // Check contain a character
            else if (!value.match(/[a-z]/m)) {
                that.setState({
                    checkPassword: 'invalid'
                });
            } else {
                const passwordConfirm = document.querySelector(
                    'input[name="password_confirm"]'
                ).value;
                if (passwordConfirm !== '' && value !== passwordConfirm) {
                    that.setState({
                        checkPassword: 'invalid',
                        checkPasswordConfirm: 'invalid'
                    });
                } else {
                    that.setState({
                        checkPassword: 'valid',
                        checkPasswordConfirm: 'valid'
                    });
                }
            }
            break;
        default:
            // Check the password equal password_confirm
            if (value.length < 3) {
                that.setState({
                    checkPasswordConfirm: 'invalid'
                });
            }
            // Compare with password
            else if (
                value !== document.querySelector('input[name="password"]').value
            ) {
                that.setState({
                    checkPassword: 'invalid',
                    checkPasswordConfirm: 'invalid'
                });
            } else {
                that.setState({
                    checkPassword: 'valid',
                    checkPasswordConfirm: 'valid'
                });
            }
            break;
    }
}

export function getStoresByIdUser(e, idUser) {
    fetch('/api/users/' + idUser + '/stores')
        .then(res => res.json())
        .then(stores => {
            // return stores;

            e.setState({
                stores: stores
            });
        });
}

export function getStoresBySizeByIdUser(e, idUser, firstIndex, size) {
    fetch('/api/users/' + idUser + '/stores')
        .then(res => res.json())
        .then(stores => {
            // return stores;

            e.setState({
                stores: getNewArrayBySize(stores, firstIndex, size)
            });
        });
}

export function updateUserPhone(id, phone, callback) {
    fetch('/api/users/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            phone: phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(userUpdate => {
            if (userUpdate) {
                // console.log(userUpdate);
                callback(userUpdate);
            } else {
                callback(null);
            }
        });
}

export function logout() {
    fetch('/api/logout', {
        method: 'GET'
    })
        .then(result => {
            window.location.href = '/';
        })
        .catch(err => console.log(err));
}

export function getUserLogged(callback) {
    fetch('/api/login')
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

export function getStoresByIdUser2(idUser, callback) {
    fetch('/api/users/' + idUser + '/stores')
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

export function getAvgRatesStoresByUser(user, callback) {
    let sumAvgStarsStoresUser = 0;
    let ratesCountStores = 0;
    getStoresByIdUser2(user._id, stores => {
        if (stores.length > 0) {
            stores.map((store, key) => {
                let avgRatesStore = getAvgRatesStore(store);
                if (avgRatesStore > 0) {
                    sumAvgStarsStoresUser += avgRatesStore;
                    ratesCountStores++;
                }
                return null;
            });

            if (ratesCountStores > 0) {
                // console.log(sumAvgStarsStoresUser / ratesCountStores);
                callback(sumAvgStarsStoresUser / ratesCountStores);
            } else {
                callback(0);
            }
        } else {
            callback(0);
        }
    });
}

export function getProductsAllStoresByUser(idUser, callback) {
    let products = [];
    fetch('/api/users/' + idUser + '/stores')
        .then(res => res.json())
        .then(stores => {
            if (stores.length > 0) {
                stores.map((store, key) => {
                    if (store.products.length > 0) {
                        store.products.map((product, key) => {
                            product.store = store;
                            products.push(product);

                            return null;
                        });
                    }

                    return null;
                });
            }

            callback(products);
        })
        .catch(err => console.log(err));
}

export function checkUserLogin(username, password, callback) {
    fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify({
            email: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(result => {
            callback(result);
        });
}

export function getUsers(callback) {
    fetch('/api/users/')
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

export function getUserByAuthorizationUser(callback) {
    let usersMain = [];
    getUsers(users => {
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                if (
                    users[i].authorization &&
                    users[i].authorization.name !== 'Admin' &&
                    users[i].authorization.name !== 'Employee'
                ) {
                    usersMain.push(users[i]);
                }

                if (i === users.length - 1) {
                    callback(usersMain);
                }
            }
        }
    });
}

/**
 * userModel {user: user, stores: []}
 * @param {*} callback
 */
export function getUserModels(callback) {
    let userModels = [];
    getUserByAuthorizationUser(users => {
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                getStoresByIdUser2(users[i]._id, stores => {
                    userModels.push({
                        user: users[i],
                        stores: stores
                    });

                    if (userModels.length === users.length) {
                        callback(userModels);
                    }
                });
            }
        } else {
            callback([]);
        }
    });
}

/**
 * userModel2 {user: user, stores: [], products: []}
 * @param {*} callback
 */
export function getUserModel2s(callback) {
    let userModel2s = [];
    getUserByAuthorizationUser(users => {
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                getStoresByIdUser2(users[i]._id, stores => {
                    getProductsAllStoresByUser(users[i]._id, products => {
                        userModel2s.push({
                            user: users[i],
                            stores: stores,
                            products: products,
                            views: getAllStoresViewsCount(stores)
                        });

                        if (userModel2s.length === users.length) {
                            callback(userModel2s);
                        }
                    });
                });
            }
        } else {
            callback([]);
        }
    });
}

export function checkStoresCountCreated(user) {
    const currentDate = new Date();
    return new Promise((resolve, reject) => {
        getStoresByIdUser2(user._id, stores => {
            if (
                stores.length < user.maxStoresCountCreated.count &&
                (!user.maxStoresCountCreated.timeLimited ||
                    currentDate <=
                        new Date(user.maxStoresCountCreated.timeLimited))
            ) {
                return resolve(true);
            } else {
                return reject(false);
            }
        });
    });
}

export function getAllStoresViewsCount(stores) {
    if (stores) {
        let storesViewsCount = 0;
        stores.map((store, key) => {
            getStoreViewsCount(store, result => {
                storesViewsCount += result;
            });

            return null;
        });

        return storesViewsCount;
    } else {
        return 0;
    }
}
