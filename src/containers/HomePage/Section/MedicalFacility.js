import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { MEDICAL_FACILITY_IMG } from '../../../utils';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-container section-medical'>
                <div className='section-header'>
                    <span className='section-title'>Cơ sở y tế</span>
                    <button className='section-btn'>Xem thêm</button>
                </div>
                <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-item'>
                                <div className='item-custom'>
                                    {/* <div className='item-img'><img  src={MEDICAL_FACILITY_IMG.benhvien108}/></div> */}
                                    <div className='item-img item-img-medical'></div>
                                    <div className='item-text'>Bệnh viện</div>
                                </div>
                            </div>   
                            <div className='section-item'>
                                <div className='item-custom'>
                                    {/* <div className='item-img'><img  src={MEDICAL_FACILITY_IMG.benhvien108}/></div> */}
                                    <div className='item-img item-img-medical'></div>
                                    <div className='item-text'>Bệnh viện </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                    {/* <div className='item-img'><img  src={MEDICAL_FACILITY_IMG.benhvien108}/></div> */}
                                    <div className='item-img item-img-medical'></div>
                                    <div className='item-text'>Bệnh viện </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                    {/* <div className='item-img'><img  src={MEDICAL_FACILITY_IMG.benhvien108}/></div> */}
                                    <div className='item-img item-img-medical'></div>
                                    <div className='item-text'>Bệnh viện </div>
                                </div>
                            </div> 
                            <div className='section-item'>
                                <div className='item-custom'>
                                    {/* <div className='item-img'><img  src={MEDICAL_FACILITY_IMG.benhvien108}/></div> */}
                                    <div className='item-img item-img-medical'></div>
                                    <div className='item-text'>Bệnh viện </div>
                                </div>
                            </div> 
                        </Slider>
                </div>                       
            </div> 
        );
    }

}

//redux

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
