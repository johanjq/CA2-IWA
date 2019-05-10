import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";

interface NavBarInternalProps {
  token: string | null;
}

interface NavBarInternalState {}

class NavBarInternal extends React.Component<
  NavBarInternalProps,
  NavBarInternalState
> {
  public render() {
    return (
      <div className="navbar">
        <ul>
          <NavLink to="/" activeClassName="active">
            <li style={{
                float: "left",
                border: "2px solid rgb(41, 80, 255)",
                backgroundColor: "rgb(41, 80, 255)",
                marginLeft: "1em",
                padding: ".5em 3em",
                color: "white"
              }}>Home</li>
          </NavLink>
          {this._renderSomethingPrivate()}
        </ul>
      </div>
    );
  }
  private _renderSomethingPrivate() {
    const token = this.props.token;
    if (token) {
      return (
        <NavLink to="/profile" activeClassName="active">
          <li style={{ float: "right", border: "2px solid rgb(41, 80, 255)", padding: ".5em 3em", marginRight: "1em", color: "rgb(41, 80, 255)"}}>
            User Profile
          </li>
        </NavLink>
      );
    } else {
      return (
        <div className="buttons">
          <NavLink to="/sign_up" activeClassName="signUp">
            <li
              style={{
                float: "right",
                border: "2px solid rgb(41, 80, 255)",
                backgroundColor: "rgb(41, 80, 255)",
                marginLeft: "2em",
                padding: ".5em 3em",
                marginRight: "1em",
                color: "white"
              }}
            >
              sign up
            </li>
          </NavLink>
          <NavLink to="/sign_in" className="signIn">
            <li
              style={{ float: "right", 
              border: "2px solid rgb(41, 80, 255)",
              padding: ".5em 3em",
              color: "rgb(41, 80, 255)"
            }}
            >
              log in
            </li>
          </NavLink>
        </div>
      );
    }
  }
}

export const NavBar = withAuth(props => (
  <NavBarInternal token={props.authToken} />
));
