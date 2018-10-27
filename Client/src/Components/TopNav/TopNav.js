import React, { Component } from 'react'
import  './CSS/TopNav.css'
import SideNav from '../../Components/SideNav/SideNav.js'
import logo from "./CSS/Black_B.png"


class TopNav extends Component{

    render(){
        return(
                <div className="topnav">
                    <SideNav/>
                    <img id="bm-logo" src={logo} alt={logo} width="100" height="50" />
                </div>
        );
    }
}


export default TopNav