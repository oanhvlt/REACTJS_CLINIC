import React, { Component } from 'react';
import { connect } from 'react-redux';
//import HomeHeader from '../../HomePage/HomeHeader/HomeHeader_banner';
import '../../HomePage/HomePage.scss';
import './DoctorDetails.scss';
import HomeMenu from '../../HomePage/HomeHeader/HomeMenu';
import {getDoctorDetailsService} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DoctorDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: {}
        }
    }

    //get param pass from router 'this.props.match.params.'
    //.id: by router at App.js >>  DOCTOR_DETAILS: '/doctor-detals/:id'
    //console.log('check params: ',  this.props.match.params.id); 
    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDoctorDetailsService(id);
           
            if(res && res.errCode === 0){
                this.setState({
                    doctorDetails: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.usersRedux !== this.props.usersRedux){
            this.setState({
                
            })
        } 
    }
   
    render() {
        console.log('check state: ', this.state)

        let {doctorDetails} = this.state;
        let {language} = this.props;
        let nameVi = '', nameEn = '';

        if(doctorDetails && doctorDetails.positionData){
            nameVi = `${doctorDetails.positionData.valueVi}, ${doctorDetails.lastName} ${doctorDetails.firstName}`;
            nameEn = `${doctorDetails.positionData.valueEn}, ${doctorDetails.firstName} ${doctorDetails.lastName}`;
        }
       

        return (
        <> 
            <div className='container-page'>
                <HomeMenu />
                <div className='doctor-details-container'>
                    <div className='intro'>
                        <div className='content-left'
                        style={{backgroundImage: `url(${doctorDetails && doctorDetails.image ? doctorDetails.image: ''})`}} 
                        />
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {doctorDetails && doctorDetails.Markdown && doctorDetails.Markdown.description
                                    && 
                                    <span>
                                        {doctorDetails.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule'>

                    </div>
                  
                    <div className='info-detail'>
                        {doctorDetails && doctorDetails.Markdown && doctorDetails.Markdown.contentHTML
                            && 
                            <div dangerouslySetInnerHTML={{__html: doctorDetails.Markdown.contentHTML}}
                            />
                        }
                    </div>
                    <div className='comment'>

                    </div>
                </div>
            </div>
        </>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetails);