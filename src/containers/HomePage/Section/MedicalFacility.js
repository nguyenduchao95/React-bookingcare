import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class MedicalFacility extends Component {

    render() {

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cơ sở y tế nổi bật</h2>
                        <button>XEM THÊM</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div className="position">Hệ thống y tế Thu Cúc</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div className="position">Hệ thống y tế Thu Cúc</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div className="position">Hệ thống y tế Thu Cúc</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div className="position">Hệ thống y tế Thu Cúc</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"></div>
                                <div className="position">Hệ thống y tế Thu Cúc</div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
