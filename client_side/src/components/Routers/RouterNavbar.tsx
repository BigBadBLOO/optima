//core
import React from "react";
import {Route, Switch} from "react-router-dom";

//components
import Home from "@pages/UserAuth/home/Home";
import Platform from "@pages/UserAuth/platform/Platform";
import PageNotFound from "@pages/ErrorPages/PageNotFound404";
import Documentation from "@pages/UserAuth/Documentation/Documentation";


const RouterNavbar: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home}/>
      {/*/!*выбранная платформа*!/*/}
      <Route path="/platforms/:platformId?/:page?/" component={Platform}/>
      {/*Документация*/}
      <Route path="/documentation/" exact component={Documentation}/>

      <Route component={PageNotFound}/>
    </Switch>
  )
}
export default RouterNavbar