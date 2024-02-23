import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {LANGUAGES, DATE_FORMAT} from '../../../utils';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
//import custom component DatePicker
import DatePicker from '../../../components/Input/DatePicker';
//format date
import moment from 'moment';
import { toast } from "react-toastify";
//thao tác với array
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            doctors: [],
            selectedDoctor: {}, //key: label, value (buildDataInputSelect)
            //currentDate: new Date(),
            currentDate: '',
            rangeTime:[],
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllCodeScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.doctorsRedux !== this.props.doctorsRedux){
            let dataSelect = this.buildDataInputSelect(this.props.doctorsRedux);
            this.setState({
                doctors: dataSelect
            })
        }
        if(prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux){
            let data = this.props.allScheduleTimeRedux;
            if(data && data.length > 0){
                data.map(item => {
                    item.isSelected = false;
                    return item;
                })
                //c2:
                // data = data.map(item => ({
                //     ...item, //copy toàn bộ item => gán cho mỗi item 1 attr isSelected: 'false' 
                //     isSelected: false,
                // }))
            }
            
            this.setState({
                rangeTime: this.props.allScheduleTimeRedux
            })
        }
    
       
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.map( item => {
                let obj = {};
                let lableVi = `${item.lastName} ${item.firstName}`;
                let lableEn = `${item.firstName} ${item.lastName}`;
                obj.label = this.props.languageRedux === LANGUAGES.VI ? lableVi: lableEn;
                obj.value = item.id;
                result.push(obj);
                return item;
            })   
        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ 
            selectedDoctor
        });
        
    };

    handleOnchangeDatePicker = (date) =>{
        //console.log('date: ', date);
        //console.log('date[0]: ',date[0])
        this.setState({
            currentDate: date[0],
        })
    }

    handleClickButtonTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if(item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime
            })
        }
    }

    handleSaveSchedule = () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        if(!currentDate) {
            toast.error('Invalid date!');
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid selected doctor !');
            return;
        }
        let formatedDate = moment(currentDate).format(DATE_FORMAT.SEND_TO_SERVER);
        
        if(rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value; //key of selectedDoctor: lable, value
                    obj.date = formatedDate;
                    obj.timeType = schedule.keyMap;
                    result.push(obj);
                    return schedule; //{doctorId, date, timeType}
                })
            }else{
                toast.error('Invalid selected time!');
                return;
            }
        }
       
        console.log('check result: ', result)
    }

    render() {
        
        let {rangeTime} = this.state;
        let language = this.props.languageRedux;

        return (
            <div className='manage-schedule-container'>
                <div className='ms-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select 
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.doctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker className='form-control'
                                onChange = {this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate = {new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'} 
                                        key={index} onClick={() => this.handleClickButtonTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn bg-platform' onClick={()=>this.handleSaveSchedule()}>
                                Lưu thông tin
                            </button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>   
        );
    }
}

//systemMenuPath: initial from 'appReducer.js'
//isLoggedIn: initial from 'userReducer.js'
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languageRedux: state.app.language,
        doctorsRedux: state.admin.allDoctors,
        allScheduleTimeRedux: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime: () => dispatch(actions.fetchAllCodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
