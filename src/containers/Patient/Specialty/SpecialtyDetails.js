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


class SpecialtyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId:[42,44,45]
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }


    render() {
        let {arrDoctorId} = this.state;
        return ( 
            <div className='container-page'>
                <HomeMenu />
                <div className='specialty-details-container'>
                    <div className='description'>

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


