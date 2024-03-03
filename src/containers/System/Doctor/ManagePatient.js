import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
// import {getScheduleByDateService} from '../../../services/userService';


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }

    handleOnchangeDatePicker = (date) =>{
        //console.log('date: ', date);
        //console.log('date[0]: ',date[0])
        this.setState({
            currentDate: date[0],
        })
    }


    render() {
        //let {language} = this.props;
        let {currentDate} = this.state;
        return ( 
            <div className='manage-patient-container'>
                <div className='mp-title'>
                    Quản lý bệnh nhân
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker className='form-control'
                            onChange = {this.handleOnchangeDatePicker} value={currentDate}
                        />
                    </div>
                    <div className='col-12 patients-table'>
                        <table id='patients'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Fist Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>  
                            <tr>
                                <td>Email</td>         
                                <td>Name</td>   
                                <td>Name</td>   
                                <td>Address</td>   
                                <td>Actions</td>       
                            </tr> 
                        
                        </tbody>
                        </table> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
