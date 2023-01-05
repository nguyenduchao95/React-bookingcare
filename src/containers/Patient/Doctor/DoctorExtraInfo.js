import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss'
import * as actions from '../../../store/actions';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(preProps, preState, snapshot) {

    }

    showHideDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo
        })
    }

    render() {
        let { isShowDetailInfo } = this.state
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">Dia chi pk</div>
                    <div className="name-clinic">PK chuyen khoa</div>
                    <div className="detail-clinic">Dia chi</div>
                </div>

                <div className="content-down">
                    {isShowDetailInfo === false ?
                        <div className="short-info">
                            <span className="short-info-title">Giá khám: </span>250K.
                            <span className="show-info" onClick={() => this.showHideDetailInfo()}>Xem thêm chi tiết</span>
                        </div>
                        :
                        <>
                            <div className="title-price">Giá khám:</div>
                            <div className="detail-info">
                                <div className="price">
                                    <span>Giá khám</span>
                                    <span>250K - 350K</span>
                                </div>
                                <div className="note">
                                    <div>Giá tư vấn 15 phút: 250.000vnđ</div>
                                    <div>Giá tư vấn 30 phút: 500.000vnđ</div>
                                </div>
                                <div className="payment">Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>
                            </div>
                            <div className="hide-info" onClick={() => this.showHideDetailInfo()}>Ẩn bảng giá</div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
