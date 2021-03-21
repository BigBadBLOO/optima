//core
import {Route, Switch} from "react-router-dom";
import React from "react";

//pages
import LandingPage from "@pages/LandingPage";
import UserAgreement from "@pages/UserAgreement/UserAgreement";
import PageNotFound from "@pages/ErrorPages/PageNotFound404";


const RouterNavbarNoAuth: React.FC = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={LandingPage}/>
                {/*пользовательское соглашение*/}
                <Route path="/userAgreement/" exact component={UserAgreement}/>
                {/*политика конфиденциальности*/}
                {/*<Route path="/privacyPolicy/" exact component={PrivacyPolicy}/>*/}
                {/*/!*выбранная платформа*!/*/}
                {/*<Route path="/platforms/:platformId/:page?/" component={Platform}/>*/}
                {/*/!*Страница не найдена*!/*/}
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    )
}

export default RouterNavbarNoAuth