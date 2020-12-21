import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import Login from './Components/Login/login';
import AdminHome from './Components/AdminHome/adminHome';

function App() {
  const user = useSelector(state => state.admin.currentAdmin);
  return (
    <div class="App">
      <Switch>
        <Route exact path='/' component={Login}/>
        {user ? <Route path={'/home'} component={AdminHome}/> :null}
      </Switch>
    </div>
  );
}

export default withRouter(App) ;
