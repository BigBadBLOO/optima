import React from "react";

import MyModal from "../components/Modal/Modal";
import Footer from "../components/Footer/Footer";
import Header, {HeaderForNonAuthUser} from "../components/Header/Header";
import Body, {BodyForNonAuthUser} from "../components/Body/Body";
import Documentation from "./Documentation";
import NewPlatform from "./NewPlatform";
import {Route} from "react-router-dom";
import Settings from "./Settings";


function NavHome() {
  return (
    <div>
      <Route path="/" exact component={Body}/>
      {/*Документация*/}
      <Route path="/documentation/" exact component={Documentation}/>
       {/*Новая платформа*/}
      <Route path="/newPlatform/" exact component={NewPlatform}/>
      {/*политика конфиденциальности*/}
      <Route path="/settings/" exact component={Settings}/>
      {/*/!*выбранная платформа*!/*/}
      {/*<Route path="/platforms/:platformId/:page?/" component={Platform}/>*/}
    </div>
  )
}

function Home() {
  return (
      <>
        <Header/>
        <NavHome/>
      </>
  )
}

export default Home

function HomeForNoneAuth() {
  const refToPossibility = React.createRef();
  const refToTariff = React.createRef();
  const refToModules = React.createRef();

  return (
      <div className="bg-white">
        <HeaderForNonAuthUser refToPossibility={refToPossibility} refToTariff={refToTariff} refToModules={refToModules}/>
        <BodyForNonAuthUser refToPossibility={refToPossibility} refToTariff={refToTariff} refToModules={refToModules}/>
        <Footer/>
        <MyModal/>
      </div>
  )
}

export {
  HomeForNoneAuth
}