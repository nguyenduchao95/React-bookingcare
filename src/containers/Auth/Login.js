import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: true,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin()
        }
    }


    render() {
        let { username, password, isShowPassword } = this.state
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group mb-4">
                            <label className="form-label">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your user"
                                value={username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>

                        <div className="col-12 form-group mb-1">
                            <label className="form-label">Password:</label>
                            <div className="custom-input-pass">
                                <input
                                    className="form-control"
                                    type={isShowPassword ? 'password' : 'text'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleOnKeyDown(event)}
                                />
                                <span
                                    onClick={() => this.handleShowHidePassword()}>
                                    {isShowPassword ?
                                        <i className="fas fa-eye"></i>
                                        :
                                        <i className="fas fa-eye-slash"></i>
                                    }
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className="col-12 mt-4">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()} >
                                Login
                            </button>
                        </div>
                        <div className="col-12 my-3">
                            <div className="forgot-password">Forget your password?</div>
                            <div className="socials-login">
                                <p>Or Login with:</p>
                                <span>
                                    <img
                                        alt="svgImg"
                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjRkZDMTA3IiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMS42NDksNC42NTctNi4wOCw4LTExLjMwMyw4Yy02LjYyNywwLTEyLTUuMzczLTEyLTEyYzAtNi42MjcsNS4zNzMtMTIsMTItMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxMi45NTUsNCw0LDEyLjk1NSw0LDI0YzAsMTEuMDQ1LDguOTU1LDIwLDIwLDIwYzExLjA0NSwwLDIwLTguOTU1LDIwLTIwQzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkYzRDAwIiBkPSJNNi4zMDYsMTQuNjkxbDYuNTcxLDQuODE5QzE0LjY1NSwxNS4xMDgsMTguOTYxLDEyLDI0LDEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Q0FGNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2Yy01LjIwMiwwLTkuNjE5LTMuMzE3LTExLjI4My03Ljk0NmwtNi41MjIsNS4wMjVDOS41MDUsMzkuNTU2LDE2LjIyNyw0NCwyNCw0NHoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMTk3NkQyIiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMC43OTIsMi4yMzctMi4yMzEsNC4xNjYtNC4wODcsNS41NzFjMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48L3N2Zz4="
                                    />
                                </span>
                                <span>
                                    <img
                                        alt="svgImg"
                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48bGluZWFyR3JhZGllbnQgaWQ9IkxkNnNxcnRjeE15Y2tFbDZ4ZURkTWFfdUxXVjVBOXZYSVB1X2dyMSIgeDE9IjkuOTkzIiB4Mj0iNDAuNjE1IiB5MT0iOS45OTMiIHkyPSI0MC42MTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyYWE0ZjQiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDdhZDkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjTGQ2c3FydGN4TXlja0VsNnhlRGRNYV91TFdWNUE5dlhJUHVfZ3IxKSIgZD0iTTI0LDRDMTIuOTU0LDQsNCwxMi45NTQsNCwyNHM4Ljk1NCwyMCwyMCwyMHMyMC04Ljk1NCwyMC0yMFMzNS4wNDYsNCwyNCw0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNi43MDcsMjkuMzAxaDUuMTc2bDAuODEzLTUuMjU4aC01Ljk4OXYtMi44NzRjMC0yLjE4NCwwLjcxNC00LjEyMSwyLjc1Ny00LjEyMWgzLjI4M1YxMi40NiBjLTAuNTc3LTAuMDc4LTEuNzk3LTAuMjQ4LTQuMTAyLTAuMjQ4Yy00LjgxNCwwLTcuNjM2LDIuNTQyLTcuNjM2LDguMzM0djMuNDk4SDE2LjA2djUuMjU4aDQuOTQ4djE0LjQ1MiBDMjEuOTg4LDQzLjksMjIuOTgxLDQ0LDI0LDQ0YzAuOTIxLDAsMS44Mi0wLjA4NCwyLjcwNy0wLjIwNFYyOS4zMDF6Ij48L3BhdGg+PC9zdmc+"
                                    />
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
