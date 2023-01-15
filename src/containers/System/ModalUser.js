import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ModalUser.scss'


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = this.state
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.createNewUser(this.state)
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        }
    }

    render() {
        let { isOpen } = this.props
        let { email, password, firstName, lastName, address } = this.state
        return (
            <Modal
                isOpen={isOpen}
                modalTransition={{ timeout: 200 }}
                backdropTransition={{ timeout: 200 }}
                toggle={() => this.toggle()}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-container">
                        <form className="row">
                            <div className="col-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    value={email}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    values={password}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="firstName" className="form-label">Firt Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                    value={firstName}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                    value={lastName}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="1234 Main St"
                                    name="address"
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    value={address}
                                />
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleAddNewUser()}>Add new</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
