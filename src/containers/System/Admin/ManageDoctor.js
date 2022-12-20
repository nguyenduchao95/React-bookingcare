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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
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

    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value })
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
            doctorId: this.state.selectedOption.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    render() {
        let { selectedOption, description, listDoctors, contentMarkdown, hasOldData } = this.state
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label className="mb-2">Chọn bác sĩ</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={listDoctors}
                        />
                    </div>

                    <div className="content-right form-group">
                        <label className="mb-2">Thông tin giới thiệu:</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={description}
                        >

                        </textarea>
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
                    {hasOldData ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}

                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
