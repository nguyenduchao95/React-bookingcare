import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

        if (this.props.doctorId !== preProps.doctorId) {
            let res = await getExtraInfoDoctorById(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    showHideDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo
        })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state
        let { language } = this.props
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-info-doctor.text-address" /></div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className="detail-clinic">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>

                <div className="content-down">
                    {isShowDetailInfo === false ?
                        <div className="short-info">
                            <span className="short-info-title"><FormattedMessage id="patient.extra-info-doctor.price" />: </span>
                            {extraInfo && extraInfo.priceTypeData ?
                                <NumberFormat
                                    value={language === LANGUAGES.VI ? extraInfo.priceTypeData.valueVi : extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                />
                                : ''
                            }
                            <span className="show-info" onClick={() => this.showHideDetailInfo()}><FormattedMessage id="patient.extra-info-doctor.detail" /></span>
                        </div>
                        :
                        <>
                            <div className="title-price"><FormattedMessage id="patient.extra-info-doctor.price" />:</div>
                            <div className="detail-info">
                                <div className="price">
                                    <span><FormattedMessage id="patient.extra-info-doctor.price" /></span>
                                    <span>
                                        {extraInfo && extraInfo.priceTypeData ?
                                            <NumberFormat
                                                value={language === LANGUAGES.VI ? extraInfo.priceTypeData.valueVi : extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                            />
                                            : ''
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                                <div className="payment"><FormattedMessage id="patient.extra-info-doctor.payment" /></div>
                            </div>
                            <div className="hide-info" onClick={() => this.showHideDetailInfo()}><FormattedMessage id="patient.extra-info-doctor.hide-price" /></div>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
