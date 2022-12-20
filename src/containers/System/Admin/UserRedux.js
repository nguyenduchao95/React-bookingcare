import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }

    }


    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()

        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate = (preProps, preState, snapshot) => {
        if (preProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (preProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (preProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (preProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                previewImgURL: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)

            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    previewImg = () => {
        if (!this.state.previewImgURL) return

        this.setState({ isOpen: true })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (!isValid) return

        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                alert(`Please enter your ${arrCheck[i]}`)
                isValid = false
                break
            }
        }

        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }

        this.setState({
            email: user.email,
            password: '1234',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imageBase64
        })
    }

    render() {
        let { genderArr, positionArr, roleArr, previewImgURL, isOpen, email, password, firstName, lastName, phoneNumber, address, gender, role, position, avatar, action } = this.state
        let { language, isLoadingGender } = this.props

        return (
            <div className="user-redux-container">
                <div className="title" >
                    User redux
                </div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div>
                                <div className="row mb-4">
                                    <div className="col-12 mb-3 fs-2"><FormattedMessage id="manage-user.add" /></div>
                                    <div>{isLoadingGender ? 'Loading genders' : ''}</div>
                                    <div className="form-group col-3">
                                        <label htmlFor="email"><FormattedMessage id="manage-user.email" /></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            disabled={action === CRUD_ACTIONS.EDIT}
                                            value={email}
                                            onChange={(event) => this.onChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            disabled={action === CRUD_ACTIONS.EDIT}
                                            value={password}
                                            onChange={(event) => this.onChangeInput(event, 'password')}
                                        />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="firstName"><FormattedMessage id="manage-user.first-name" /></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="1234 Main St"
                                            value={firstName}
                                            onChange={(event) => this.onChangeInput(event, 'firstName')}
                                        />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="lastName"><FormattedMessage id="manage-user.last-name" /></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="1234 Main St"
                                            value={lastName}
                                            onChange={(event) => this.onChangeInput(event, 'lastName')}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="form-group col-3">
                                        <label htmlFor="phonenumber"><FormattedMessage id="manage-user.phone-number" /></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phonenumber"
                                            value={phoneNumber}
                                            onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="form-group col-9">
                                        <label htmlFor="address"><FormattedMessage id="manage-user.address" /></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={address}
                                            onChange={(event) => this.onChangeInput(event, 'address')}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="form-group col-3">
                                        <label htmlFor="gender"><FormattedMessage id="manage-user.gender" /></label>
                                        <select
                                            id="gender"
                                            className="form-select"
                                            value={gender}
                                            onChange={(event) => this.onChangeInput(event, 'gender')}
                                        >
                                            {genderArr && genderArr.length > 0 && genderArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group col-3">
                                        <label htmlFor="position"><FormattedMessage id="manage-user.position" /></label>
                                        <select
                                            id="position"
                                            className="form-select"
                                            value={position}
                                            onChange={(event) => this.onChangeInput(event, 'position')}
                                        >
                                            {positionArr && positionArr.length > 0 && positionArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group col-3">
                                        <label htmlFor="roleId"><FormattedMessage id="manage-user.role" /></label>
                                        <select
                                            id="roleId"
                                            className="form-select"
                                            value={role}
                                            onChange={(event) => this.onChangeInput(event, 'role')}
                                        >
                                            {roleArr && roleArr.length > 0 && roleArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group col-3">
                                        <label htmlFor="image"><FormattedMessage id="manage-user.image" /></label>
                                        <div className="preview-img-container">
                                            <input
                                                type="file"
                                                id="previewImg" hidden
                                                onChange={(event) => this.handleOnChangeImage(event)}
                                            />
                                            <label className="label-upload" htmlFor="previewImg">
                                                <span>Tải ảnh </span>
                                                <div><i className="fas fa-user-tie"></i></div>
                                            </label>
                                            <div
                                                className="preview-image"
                                                style={{ background: `url(${previewImgURL}) center / contain no-repeat` }}
                                                onClick={() => this.previewImg()}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-5">
                                    <button
                                        type="submit"
                                        className={action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => this.handleSaveUser()}
                                    >{action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                />
                            </div>
                        </div>
                    </div>
                </div >

                {
                    isOpen && (
                        <Lightbox
                            mainSrc={previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )
                }
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
