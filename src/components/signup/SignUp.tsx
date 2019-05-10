import * as React from 'react';
import './style.css'

export class SignUp extends React.Component {
  public render() {
      return (
        <div className="signup">
          <form>
            <h3>Sign Up</h3>
            <input type="text" placeholder="Enter Username"/>
            <input type="text" placeholder="Enter Password"/>
            <button className="btn">Sign Up</button>
          </form>
        </div>     
      );
  }
}