import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import './HomeHeader.scss';
import { withRouter } from "react-router"

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    render() {
        let { language, isShowBanner } = this.props

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div
                                className="header-logo"
                                onClick={() => this.returnToHome()}
                            >
                            </div>
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>

                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-room" /></div>
                            </div>

                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>

                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>

                        <div className="right-content">
                            <div className="support">
                                <i className="far fa-question-circle"></i>
                                <span><FormattedMessage id="homeheader.support" /></span>
                            </div>

                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</div>
                        </div>
                    </div>
                </div>

                {isShowBanner &&
                    <div className="home-header-banner">
                        <div className="banner-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <FormattedMessage id="banner.placeholder">
                                    {placeholder =>
                                        <input placeholder={placeholder} />
                                    }
                                </FormattedMessage>
                            </div>
                        </div>

                        <div className="banner-down">
                            <div className="option">
                                <div className="option-child">
                                    <div className="icon-child"><i className="far fa-hospital"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-vial"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-medkit"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child7" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-ambulance"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child8" /></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-plus-square"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.child9" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
