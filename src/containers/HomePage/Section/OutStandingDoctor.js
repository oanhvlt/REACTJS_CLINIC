import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class OutStandingDoctor extends Component {

    render() {
        return (
        <div className='section-container section-outstanding-doctor'>
            <div className='section-header'>
                <span className='section-title'>Bác sĩ nổi bật tuần qua</span>
                <button className='section-btn'>Xem thêm</button>
            </div>
            <div className='section-body'>
                    <Slider {...this.props.settings}>
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-outstanding-doctor'></div>
                                <div className='position text-center'>
                                    <div>Khám nam học, Bệnh viện Nam học và hiếm muộn Hà nội</div>
                                    <div>Nam học 1</div>
                                </div>
                            </div>
                        </div>   
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-outstanding-doctor'></div>
                                <div className='position text-center'>
                                    <div>Khám nam học, Bệnh viện Nam học và hiếm muộn Hà nội</div>
                                    <div>Nam học 2</div>
                                </div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-outstanding-doctor'></div>
                                <div className='position text-center'>
                                    <div>Khám nam học, Bệnh viện Nam học và hiếm muộn Hà nội</div>
                                    <div>Nam học 3</div>
                                </div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-outstanding-doctor'></div>
                                <div className='position text-center'>
                                    <div>Khám nam học, Bệnh viện Nam học và hiếm muộn Hà nội</div>
                                    <div>Nam học 4</div>
                                </div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-outstanding-doctor'></div>
                                <div className='position text-center'>
                                    <div>Khám nam học, Bệnh viện Nam học và hiếm muộn Hà nội</div>
                                    <div>Nam học 5</div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
