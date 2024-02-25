import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../HomePage/HomePage.scss';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {getScheduleByDateService} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
           allDays: [],
           allRegisterTime: []
        }
    }

    capitalizeFirstLetter (str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    loadAllDays = (language) => {
        let arrDays = []
        //add(i, 'days'): tăng lên i ngày
        for (let i = 0; i < 7; i++){
            let obj = {};
            if(language === LANGUAGES.VI){
                obj.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                
            }else{
                obj.label =  moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            obj.value =  moment(new Date()).add(i, 'days').startOf('day').valueOf(); //startOf('day'): 0h:0m:0s
            arrDays.push(obj);
        }
        this.setState({
            allDays: arrDays
        })
    }

    async componentDidMount() {
       this.loadAllDays(this.props.language);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
            this.loadAllDays(this.props.language);
        }   
    }

    handleOnchangeSelect = async (e) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleByDateService(doctorId, date);
            if(res && res.errCode === 0){
                this.setState({
                    allRegisterTime: res.data ? res.data : []
                })
            }
            //console.log('event res: ', res)
        }
       
    }
   
    render() {
        let {allDays, allRegisterTime} = this.state;
        let {language} = this.props;
        return ( 
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                   <select onChange={(event) => this.handleOnchangeSelect(event)}>
                    {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return(
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            ) 
                        })
                    }
                   </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calender'>
                        <span><i className='fas fa-calendar-alt'/> Lịch khám</span>
                    </div>
                    <div className='time-content'>
                        {allRegisterTime && allRegisterTime.length > 0 ?
                            allRegisterTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return(
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })
                            :
                            <div>Bác sĩ không có lịch trống trong ngày này, 
                                vui lòng chọn ngày khác.
                            </div>
                        }
                       
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
