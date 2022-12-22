import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailabelTime: []
        }
    }

    componentDidMount() {
        let { language } = this.props
        this.setArrDays(language)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }

        this.setState({
            allDays: allDays
        })
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabelTime: res.data ? res.data : []
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    render() {
        let { allDays, allAvailabelTime } = this.state
        let { language } = this.props
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        className="all-schedule-content"
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="all-availabel-schedule">
                    <div className="text-calendar">
                        <i className="fas fa-calendar-alt"><span>Lịch khám</span></i>
                    </div>

                    <div className="time-content">
                        {allAvailabelTime && allAvailabelTime.length > 0 && allAvailabelTime.map((item, index) => {
                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                            return (
                                <button key={index}>{timeDisplay}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
