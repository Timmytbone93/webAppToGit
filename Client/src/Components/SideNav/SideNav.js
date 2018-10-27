import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import white_logo from './CSS/white.png'
import Logout from "../Logout/Logout";
import "./CSS/sideNav.css"


class SideNav extends Component{

    render(){
        return(
            <div className="align-dropdown">
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}> &#9776; Beer Money</a>
                    <hr/>
                    <NavLink to='/Dashboard' active="true">Home</NavLink>
                    <NavLink to='/AddDeal'>Add Deal</NavLink>
                    <NavLink to='/AddBar'> Add Bar </NavLink>
                    <Logout/>
                </div>
                <div id="main">
                    <button type="button" className="menuButton" onClick={openNav}>&#9776;</button>
                </div>
            </div>
        );
    }
}


function openNav(){
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


export default SideNav