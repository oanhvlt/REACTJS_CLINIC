//SpecialtyDetails
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
// import {getScheduleByDateService} from '../../../services/userService';
import './SpecialtyDetails.scss';
import HomeMenu from '../../HomePage/HomeHeader/HomeMenu';
import '../../HomePage/HomePage.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getSpecialtyDoctorByIdService, getAllCodeService} from '../../../services/userService';
import  _, { iteratee } from 'lodash';
import { LANGUAGES } from '../../../utils';

class SpecialtyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId:[],
            dataSpecialty:{},
            listProvince: []
        }
    }


    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getSpecialtyDoctorByIdService({
                id,
                location: 'ALL'
            });
            let resProvince = await  getAllCodeService('PROVINCE');
          
            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data,
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    handleOnchangeSelect = (e) => {
        console.log ('check onchange: ', e.target.value)
    }

    render() {
        //console.log('check state:', this.state)
        let {arrDoctorId, dataSpecialty, listProvince} = this.state;
        let {language} = this.props;
        return ( 
            <div className='container-page'>
                <HomeMenu />
                <div className='specialty-details-container'>
                    <div className='description'>
                        {dataSpecialty && !_.isEmpty(dataSpecialty) &&
                            <div dangerouslySetInnerHTML={{__html: dataSpecialty.contentHTML}}
                            />
                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return(
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                }) 
                            } 
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return(
                                <div className='eachDotor' key={index} >
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                            doctorIdFromParent = {item}
                                            isShowDescriptionDoctor = {true}
                                            //dataTime = {dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='schedule'>
                                            <DoctorSchedule doctorIdFromParent= {item}/>
                                        </div>
                                        <div className='extra-info'>
                                            <DoctorExtraInfo doctorIdFromParent= {item}/>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetails);


