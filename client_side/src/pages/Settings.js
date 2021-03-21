import React, {useState} from "react";

import {Link} from "react-router-dom";
import Button from "../components/BaseElement/Button";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import workWithServer from "../core/workWithServer";
import {SettingUserTabPanelFirst, SettingUserTabPanelSecond} from "../components/utils/utils";

Settings.propTypes = {
  user: PropTypes.object
}

function Settings({user}) {
  const [userLocal, setUserLocal] = useState(user)
  const [tabIndex, setTabIndex] = useState(0);

  const tabMass = ['Основные', 'Безопасность', 'Уведомления']

  return (
    <>
      <div className="m-3 md:m-10">
        <div className="flex">
          <Link to="/" className="h-6 my-auto">
            <span className="material-icons my-auto">keyboard_backspace</span>
          </Link>
          <span className="text-xl md:text-2xl my-auto md:ml-4">Настройки аккаунта</span>
          <Button className="hidden md:inline-block ml-auto my-auto" type="primary" text="Сохранить изменения" onClick={
            () => workWithServer.changeUserInfo(userLocal)
          }/>
        </div>

        <Tabs className="mt-4" selectedIndex={tabIndex} onSelect={setTabIndex}>
          <TabList className="flex overflow-x-hidden cursor-pointer border-b">
            {tabMass.map((el, index) => {
              return <Tab key={index} className={clsx("p-2 outline-none truncate",
                tabIndex === index && 'border-l border-r border-t rounded')}>{el}</Tab>
            })}
          </TabList>
          <TabPanel>
           <SettingUserTabPanelFirst userLocal={userLocal} setUserLocal={setUserLocal}/>
          </TabPanel>

          <TabPanel>
            <SettingUserTabPanelSecond userLocal={userLocal} setUserLocal={setUserLocal}/>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>


        <Button className="inline-block md:hidden mx-0 w-full mt-2" type="primary" text="Сохранить изменения"/>

      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Settings)


