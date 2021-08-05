//core
import React, {Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";


//components
const Home = lazy(() => import('@pages/UserAuth/home/Home'));
const Platform = lazy(() => import('@pages/platform/Platform'));
const PageNotFound = lazy(() => import('@pages/ErrorPages/PageNotFound404'));
const Documentation = lazy(() => import('@pages/UserAuth/Documentation/Documentation'));
import GlobalLoader from "@components/Loaders/GlobaLoader";

const RouterNavbar: React.FC = () => {
  return (
    <Suspense fallback={GlobalLoader}>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        {/*/!*выбранная платформа*!/*/}
        <Route path="/platforms/:platformId?/:page?/:param1?/" component={Platform}/>
        {/*Документация*/}
        <Route path="/documentation/" exact component={Documentation}/>

        <Route component={PageNotFound}/>
      </Switch>
    </Suspense>
  )
}
export default RouterNavbar