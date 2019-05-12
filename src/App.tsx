import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Links } from "./components/link/links";
import { LinkDetails } from "./components/LinkDetails";
import { LinkEditor } from "./components/LinkEditor";
import { LoginInternal } from "./components/signin/SignIn";
import { SignUp } from "./components/signup/SignUp";
import { Profile } from "./components/profile/Profile";
import { NavBar } from './components/header/Header'
import { LinkCreation } from './components/linkcreation/LinkCreation';


const App: React.FC = () => {
  return (
    <div className="container">
      <NavBar/>
      <Switch>
      <Route exact path='/' component={Links}/>
      <Route exact path='/link_details/:id' component={LinkDetails}/>
      <Route exact path='/link_editor/' component={LinkCreation}/>
      <Route exact path='/link_editor/:id' component={LinkCreation}/>
      <Route exact path='/sign_in' component={LoginInternal}/>
      <Route exact path='/sign_up' component={SignUp}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/profile:id' component={Profile}/>
      </Switch>
    </div>
  );
}

export default App;
