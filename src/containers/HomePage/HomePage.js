import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

// Import css files carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './HomePage.scss';
class HomePage extends Component {

    render() {
        let home_settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4, //số item show trên 1 frame
            slidesToScroll: 1, // số item lướt qua khi next/prev
        };

        return (
            <div className='container-page'>
                <HomeHeader />
                <Specialty settings = {home_settings}/>
                <MedicalFacility settings = {home_settings}/>
                <OutStandingDoctor settings = {home_settings}/>
                <HandBook settings = {home_settings}/>
                <About/>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
