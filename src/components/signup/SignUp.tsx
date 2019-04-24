import * as React from 'react';
import './style.css'

export class SignUp extends React.Component {
  public render() {
      return (
        <div className="signup">
          <form>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Enter Username"/>
            <input type="text" placeholder="Enter Password"/>
            <button className="btn">Sign Up</button>
          </form>
        </div>     
      );
  }
}