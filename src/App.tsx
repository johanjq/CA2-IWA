import React from "react";
import { Route } from 'react-router-dom';
import { Links } from "./components/Links";
import { LinkDetails } from "./components/LinkDetails";
import { LinkEditor } from "./components/LinkEditor.";
import { SignIn } from "./components/signin/SignIn";
import { SignUp } from "./components/signup/SignUp";
import { Profile } from "./components/Profile";
import { NavBar } from './features/NavBar'

const App: React.FC = () => {
  return (
    <div className="container">
      <NavBar/>
      <Route exact path='/' component={Links}/>
      <Route exact path='/link_details/:id' component={LinkDetails}/>
      <Route exact path='/link_editor/' component={LinkEditor}/>
      <Route exact path='/link_editor/:id' component={LinkEditor}/>
      <Route exact path='/sign_in' component={SignIn}/>
      <Route exact path='/sign_up' component={SignUp}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/profile:id' component={Profile}/>
    </div>
  );
}

export default App;
