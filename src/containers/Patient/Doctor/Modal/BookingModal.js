import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
    }


    render() {
        let { isModalOpenBooking, closeBookingModal, dataTime } = this.props
        return (
            <Modal
                isOpen={isModalOpenBooking}
                className={"booking-modal-container"}
                size="lg"
                centered
                toggle={closeBookingModal}
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="header-title">Thông tin đặt lịch khám bệnh</span>
                        <span className="header-close" onClick={closeBookingModal}>
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info"></div>
                        <div className="price">Giá khám 500k</div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Họ tên</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group col-6">
                                <label>Số điện thoại</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group mb-3 col-6">
                                <label>Địa chỉ Email</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group mb-3 col-6">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group mb-3 col-12">
                                <label>Lý do khám</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group mb-3 col-6">
                                <label>Đặt cho ai</label>
                                <input className="form-control" />
                            </div>

                            <div className="form-group mb-3 col-6">
                                <label>Giới tính</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm" onClick={closeBookingModal}>Xác nhận</button>
                        <button className="btn-booking-cancle" onClick={closeBookingModal}>Hủy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
