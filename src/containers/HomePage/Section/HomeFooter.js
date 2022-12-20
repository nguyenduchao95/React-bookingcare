import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {

        return (
            <div className="home-footer">
                <span>&copy; 2022 Nguyễn Đức Hảo, More information, please visit my Facebook
                    <a target="blank" href="https://www.facebook.com/profile.php?id=100006702153733">&#8594; Click here &#8592;</a>
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
