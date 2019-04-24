import React from 'react';
import './style.css'
import { NavLink, } from 'react-router-dom'

export class NavBar extends React.Component{
    public render(){
        return(
            <div>
                <ul>
                <NavLink to="/" activeClassName="active"><li>Home</li></NavLink>
                <NavLink to="/sign_up" activeClassName="active"><li style={{float: "right"}}>Sign Up</li></NavLink>
                <NavLink to="/sign_in" activeClassName="active"><li style={{float: "right"}}>Sign In</li></NavLink>                
                </ul>
            </div>
        )
    }
}