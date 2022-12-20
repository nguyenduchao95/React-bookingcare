import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils'
import moment from 'moment';
import localization from 'moment/locale/vi';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: []
        }
    }

    componentDidMount() {
        let { language } = this.props
        this.setArrDays(language)
    }
    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    render() {
        let { allDays } = this.state
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select>
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

                <div className="all-availabel-schedule"></div>
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
