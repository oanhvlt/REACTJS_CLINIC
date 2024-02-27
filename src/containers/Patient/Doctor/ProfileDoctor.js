import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './ProfileDoctor.scss';
import {getProfileDoctorByIdService} from '../../../services/userService';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }


    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctorByIdService(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }  
        if(prevProps.doctorId !== this.props.doctorId){
            //this.getInfoDoctor(this.props.doctorId);
        }   
       
    }

    render() {
        console.log('check state: ', this.state)
        let {dataProfile} = this.state;
        let {language} = this.props;
        let nameVi = '', nameEn = '';
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        
        return ( 
            <div className='profile-doctor-container'>
                <div className='intro'>
                    <div className='content-left'
                    style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image: ''})`}} 
                    >  
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                && 
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ?
                        <NumberFormat value={dataProfile.Doctor_Info.priceData.valueVi} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            suffix={'VNĐ.'} 
                            className='currency'/> 
                        : ''
                    }
                    {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN ?
                        
                        <NumberFormat value={dataProfile.Doctor_Info.priceData.valueEn} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            suffix={'USD.'} 
                            className='currency'/> 
                        : ''
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
