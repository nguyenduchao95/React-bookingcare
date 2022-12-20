import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils'
import { withRouter } from "react-router"


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <h2><FormattedMessage id="homepage.outstanding-doctor" /></h2>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (
                                    <div
                                        className="section-customize section-outstanding-doctor"
                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div
                                            className="bg-image section-outstanding-doctor"
                                            style={{ background: `url(${imageBase64}) center / cover no-repeat` }}></div>
                                        <div className="position">
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div>Da liễu</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
