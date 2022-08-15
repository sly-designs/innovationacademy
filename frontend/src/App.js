import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Theme from "./components/ui/Theme";
import { ParentPrivateRoute } from "./PrivateRoute";
import Header from "./components/ui/Header";
import LandingPage from "./components/pages/LandingPage";
import Dashboard from "./components/pages/ParentDashboard";
import EditKid from "./components/kids/EditKid";
import Programmes from "./components/pages/Programmes";
import Cohorts from "./components/pages/Cohorts";
import about from "./components/pages/About";
import contact from "./components/pages/Contact";
 
//changes

//imported about and contact
//added their path
//On component/pages I added some files for the contact and about
//all new dependencies added to package.json

const App = () => {
  const [value, setValue] = useState();

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/programmes" component={Programmes} />
          <Route exact path="/about" component={about} />
          <Route exact path="/contact" component={contact} />
          <ParentPrivateRoute exact path="/dashboard" component={Dashboard} />
          <ParentPrivateRoute
            exact
            path={`/kids/edit/:id`}
            component={EditKid}
          />
          <ParentPrivateRoute
            exact
            path={`/programmes/enroll/:id`}
            component={Programmes}
          />
          <Route exact path={`/:id/cohorts`} component={Cohorts} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
