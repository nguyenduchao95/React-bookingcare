import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
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

        if (preProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
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

    handleChange = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!currentDate) {
            toast.error('Please choose a date!')
            return
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please choose a doctor!')
            return
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = item.keyMap
                    result.push(object)
                })
            } else {
                toast.error('Please selected time!')
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        console.log('check saveBulk:', res)
        console.log('check result:', result)
    }

    render() {
        let { listDoctors, selectedDoctor, currentDate, rangeTime } = this.state
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mb-3 form-group">
                            <label className="form-label"><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={listDoctors}
                            />
                        </div>

                        <div className="col-6 mb-3 form-group">
                            <label className="form-label"><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={currentDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 mb-3 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? "btn active" : "btn"}
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {item.valueVi}
                                    </button>
                                )
                            })}
                        </div>

                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.handleSaveSchedule()}>
                        <FormattedMessage id="manage-schedule.save-info" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
