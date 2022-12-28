import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            listDoctors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfo()
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors || preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (preProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo || preProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMardown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption ? this.state.selectedOption.value : '',
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }

    render() {
        let { selectedOption, description, listDoctors, contentMarkdown, hasOldData, listPrice, listPayment,
            listProvince, selectedPrice, selectedPayment, selectedProvince, nameClinic, addressClinic, note } = this.state
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>

                    <div className="content-right form-group">
                        <label className="mb-2"><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className="form-control" rows="2"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className="more-info-extra row mb-5">
                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>

                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={nameClinic}
                        />
                    </div>

                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={addressClinic}
                        />
                    </div>

                    <div className="col-4 form-group mb-3">
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={note}
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '320px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMardown()}>
                    {hasOldData ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>}

                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
