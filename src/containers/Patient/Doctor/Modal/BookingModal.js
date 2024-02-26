import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
// import {getScheduleByDateService} from '../../../services/userService';

//use modal
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
    }



    render() {
        let {language} = this.props;
        let {isOpenModal, closeModalBooking, dataTime} = this.props;

        return ( 
            <Modal isOpen={isOpenModal}   
                className={"booking-container"} 
                size='lg' 
                centered
            >
            <div className='booking-content'>
                <div className='booking-header'>
                    <span className='left'>Thông tin đặt lịch khám bệnh</span>
                    <span className='right' onClick={closeModalBooking}> <i className='fas fa-times'/></span>
                </div>
                <div className='booking-body'>
                    {/* {JSON.stringify(dataTime)} */}
                    <div className='doctor-info'>

                    </div>
                    <div className='price'>Giá khám 500,000VNĐ</div>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Họ tên</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Số điện thoại</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-12 form-group'>
                            <label>Lý do khám</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Đặt cho ai</label>
                            <input className='form-control'/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Giới tính</label>
                            <input className='form-control'/>
                        </div>
                    </div>


                </div>
                <div className='booking-footer'>
                    <button className='btn-confirm' onClick={closeModalBooking}>Xác nhận</button>
                    <button className='btn-cancel' onClick={closeModalBooking}>Huỷ bỏ</button>
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
