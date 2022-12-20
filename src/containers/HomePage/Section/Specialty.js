import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Chuyên khoa phổ biến</h2>
                        <button>XEM THÊM</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div className="position">Cơ xương khớp</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div className="position">Cơ xương khớp</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div className="position">Cơ xương khớp</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div className="position">Cơ xương khớp</div>
                            </div>

                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div className="position">Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
