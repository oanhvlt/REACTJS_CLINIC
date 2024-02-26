import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../HomePage/HomePage.scss';
import './DoctorExtraInfo.scss';
import {getScheduleByDateService} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
           isShowDetailInfo: false,
      
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }
    
   
    render() {
        let {language} = this.props;
        let {isShowDetailInfo} = this.state;
        return ( 
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'> Phòng khám Vietlife MRI Trần Bình Trọng</div>
                    <div className='address-details'>14 Trần Bình Trọng - Hoàn Kiếm - Hà Nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false && 
                        <div className='short-info'>
                            GIÁ KHÁM: 250,000. 
                            <span onClick={() => this.showHideDetailInfo(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }
                    {isShowDetailInfo === true && 
                        <>
                            <div className='title-price'>GIÁ KHÁM:</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Giá khám:</span>
                                    <span className='right'>250,000</span>
                                </div> 
                                <div className='note'>
                                    Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm
                                </div>
                            </div>
                            <div className='payment'>
                                Phòng khám có hình thức thanh toán chi phí bằng tiền mặt và quẹt thẻ ATM
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    Ân bảng giá
                                </span>
                            </div>

                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
