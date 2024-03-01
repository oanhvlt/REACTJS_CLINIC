import React, { Component } from 'react';
import { connect } from 'react-redux';
// Import css files carousel
import Slider from "react-slick";
import { getAllSpecialtiesService } from '../../../services/userService';

class Specialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount(){
        let res = await getAllSpecialtiesService();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : ''
            })
        }
    }

    render() {     
        let {dataSpecialty} = this.state;
        return (
        <div className='section-container section-specialty'>
            <div className='section-header'>
                <span className='section-title'>Chuyên khoa phổ biến</span>
                <button className='section-btn'>Xem thêm</button>
            </div>
            <div className='section-body'>
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section-item' key={index}>
                                    <div className='item-custom'>
                                        <div className='item-img item-img-specialty'
                                        style={{backgroundImage: `url(${item.image})`}} >

                                        </div>
                                        <div className='item-text'>{item.name}</div>
                                    </div>
                                </div>   
                                )
                            })
                        }
                       
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
