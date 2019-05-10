import React from 'react';
import './style.css'
import { NavLink } from 'react-router-dom'
import { withAuth } from '../with_auth/with_auth'

interface NavBarInternalProps{
    token: string | null;
}

interface NavBarInternalState{

}

class NavBarInternal extends React.Component<NavBarInternalProps, NavBarInternalState>{
    public render(){
        return(
            <div className="navbar">
                <ul>
                
                <NavLink to="/" activeClassName="active"><li>Home</li></NavLink>
                {this._renderSomethingPrivate()}                
                </ul>
            </div>
        )
    }
    private _renderSomethingPrivate(){
        const token = this.props.token
        if(token){
          return <NavLink to="/profile" activeClassName="active"><li style={{float: "right"}}>User Profile</li></NavLink>;
        }else{
          return <div>
              <NavLink to="/sign_up" activeClassName="active"><li style={{float: "right"}}>Sign Up</li></NavLink>
              <NavLink to="/sign_in" activeClassName="active"><li style={{float: "right"}}>Sign In</li></NavLink>
                
                </div>
        }
      }
}

export const NavBar = withAuth(props => <NavBarInternal token={props.authToken}/>)