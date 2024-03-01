//SpecialtyDetails
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialtyDetails.scss';
import HomeMenu from '../../HomePage/HomeHeader/HomeMenu';
import '../../HomePage/HomePage.scss';

// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
// import {getScheduleByDateService} from '../../../services/userService';

class SpecialtyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
         
        }
    }


    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){
           
        }   
       
    }


    render() {
        return ( 
            <div className='container-page'>
                <HomeMenu />
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


