import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsers()
    }

    getAllUsers = async () => {
        let response = await getAllUsers('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsers()
                this.setState({
                    isOpenModal: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    editUser = async (user) => {
        let res = await editUserService(user)
        try {
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllUsers()
            } else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user
        })
    }

    render() {
        let { arrUsers } = this.state
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenEditModal &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModal}
                        toggle={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className="title text-center">Manage users with Hao</div>
                <div className="mx-2">
                    <button
                        className="px-2 btn btn-primary"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="me-2 fas fa-user-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.length > 0 && arrUsers.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.firstName}
                                        </td>
                                        <td>
                                            {user.lastName}
                                        </td>
                                        <td>
                                            {user.address}
                                        </td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                type="button"
                                                onClick={() => this.handleEditUser(user)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                type="button"
                                                onClick={() => this.handleDeleteUser(user)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
