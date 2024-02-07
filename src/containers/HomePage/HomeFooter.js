import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Import css files carousel
import Slider from "react-slick";

//import image form utils//ImageStore.js
//import { HomeFooter_IMG } from '../../../utils';

class HomeFooter extends Component {

    render() {     
        let settings = this.props.settings;

        return (
        <div className='home-footer'>
            <p>
                &copy; 2023 TED Digital Web Page. More information, please visit our youtube channel.
                <a target='_blank' href='https://www.w3schools.com/html/html_symbols.asp'> 
                    &#8594; Click here &#8592;
                </a>
            </p>        
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
