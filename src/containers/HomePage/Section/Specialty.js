import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Import css files carousel
import Slider from "react-slick";

//import image form utils//ImageStore.js
import { SPECIALTY_IMG } from '../../../utils';

class Specialty extends Component {

    render() {     
        let settings = this.props.settings;

        return (
        <div className='section-container'>
            <div className='section-header'>
                <span className='section-title'>Chuyên khoa phổ biến</span>
                <button className='section-btn'>Xem thêm</button>
            </div>
            <div className='section-body'>
                    <Slider {...this.props.settings}>
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-specialty'></div>
                                <div className='item-text'>Châm cứu</div>
                            </div>
                        </div>   
                        <div className='section-item'>
                            <div className='item-custom'>
                                <div className='item-img item-img-specialty'></div>
                                <div className='item-text'>Cơ xương khớp</div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'>                            
                                <div className='item-img item-img-specialty'></div>
                                <div className='item-text'>Da liễu</div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'>                                   
                                <div className='item-img item-img-specialty'></div>
                                <div className='item-text'>Y học cổ truyền</div>
                            </div>
                        </div> 
                        <div className='section-item'>
                            <div className='item-custom'> 
                                <div className='item-img item-img-specialty'></div>
                                <div className='item-text'>sức khoẻ tâm thần</div>
                            </div>
                        </div> 
                    </Slider>
            </div>                       
        </div>  
        );
    }

}

const mapStateToProps = state => {
     return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
