import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import {bookAppointmentService} from '../../../../services/userService';
//use modal
import {Modal} from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify'; 


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber:'',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId:'',
            genders: '',
            timeType: ''
        }
    }


    async componentDidMount() {
       this.props.getGender();
    }

    buildDataGender = (data) => {
        let result = [];
        if(data && data.length > 0){
            data.map(item => {
                let obj = {};
                obj.label = this.props.language === LANGUAGES.VI ? item.valueVi: item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
                return item;
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }   
        if(prevProps.genders !== this.props.genders){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        } 
        if(prevProps.dataTime !== this.props.dataTime){
            //console.log('dataTime: ', this.props.dataTime)
            let dataTime = this.props.dataTime;
            let doctorIdProps = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
            this.setState({
                doctorId: doctorIdProps,
                timeType: dataTime.timeType,
            })
        } 
   
    }

    handleOnchangeInput = (e, id) =>{
        let valueInp = e.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInp; //get value input on UI
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        })
    }

    handleChangeSelect = (selectedGender) => {
        this.setState({ 
            selectedGender
        });  
    }

    handleConfirmBooking = async () =>{
        //validate input
        let res = await bookAppointmentService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: new Date(this.state.birthday).getTime(),
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })
        if(res && res.errCode === 0){
            toast.success('Booking succeed!');
            this.props.closeModalBooking();
        }else{
            toast.error('Booking error!');
        }
        //console.log('confirm button: ', this.state)
    }

    render() {
        let {isOpenModal, closeModalBooking, dataTime} = this.props;
        let doctorIdProps = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        let {fullName, phoneNumber, email, address, reason, birthday, selectedGender, genders} = this.state;
   
        //console.log('check state: ', this.state)
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
                        <ProfileDoctor doctorIdFromParent = {doctorIdProps}
                        isShowDescriptionDoctor = {false}
                        dataTime = {dataTime}/>
                    </div>

                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Họ tên</label>
                            <input className='form-control' value={fullName} 
                            onChange={(e) => this.handleOnchangeInput(e, 'fullName')}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Số điện thoại</label>
                            <input className='form-control' value={phoneNumber} 
                            onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control' value={email} 
                            onChange={(e) => this.handleOnchangeInput(e, 'email')}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ</label>
                            <input className='form-control' value={address} 
                            onChange={(e) => this.handleOnchangeInput(e, 'address')}/>
                        </div>
                        <div className='col-12 form-group'>
                            <label>Lý do khám</label>
                            <input className='form-control' value={reason} 
                            onChange={(e) => this.handleOnchangeInput(e, 'reason')}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Ngày sinh</label>
                            <DatePicker className='form-control'
                                onChange = {this.handleOnchangeDatePicker}
                                value={birthday}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Giới tính</label>
                            <Select 
                                value={selectedGender}
                                onChange={this.handleChangeSelect}
                                options={genders}
                            />
                        </div>
                    </div>


                </div>
                <div className='booking-footer'>
                    <button className='btn-confirm' onClick={() => this.handleConfirmBooking()}>Xác nhận</button>
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
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
