import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';
import Alert from '../layout/Alert';
import AddProfile from '../profile/AddProfile';
import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route exact path='/addprofile' component={AddProfile} />

        {/*<PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
