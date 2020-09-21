import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Routes
import PrivateRoute from "./component/routing/PrivateRoute";

// Components
import Navbar from "./component/layout/Navbar";
import Drawer from "./component/layout/Drawer";
import Landing from "./component/layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import ProfileContainer from "./component/profile/ProfileContainer";
import Dashboard from "./component/dashboard/Dashboard";
import Profiles from "./component/Profiles/Profiles";
import Profile from "./component/profile/Profile";
import Followers from "./component/Profiles/Followers";
import Following from "./component/Profiles/Following";
import Setting from "./component/profile/Setting";

// Redux
import store from "./Redux/store";
import { loadUser } from "./Redux/actions/auth";
import { getAllTweets, getTweetsByMe } from "./Redux/actions/tweet";

// utils
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllTweets());
    store.dispatch(getTweetsByMe());
  }, []);

  // console.log(moment(moment() + 36e5 * 5).twitter());

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Drawer />

          <Route exact path='/' component={Landing} />

          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/Login' component={Login} />
            <PrivateRoute exact path='/profile' component={ProfileContainer} />
            <PrivateRoute exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/profiles' component={Profiles} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/followers' component={Followers} />
            <PrivateRoute exact path='/following' component={Following} />
            <PrivateRoute exact path='/setting' component={Setting} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
