import * as React from 'react';
import './style.css'

interface SignInProps {

}

interface SignInState {
  
}

export class SignIn extends React.Component<SignInProps, SignInState> {
  public render() {
      return (
        <div className="signin">
          <form>
            <h2>Sign In</h2>
            <input type="text" placeholder="Enter Username"/>
            <input type="text" placeholder="Enter Password"/>
            <button className="btn">Sign In</button>
          </form>
        </div>       
      );
  }
}