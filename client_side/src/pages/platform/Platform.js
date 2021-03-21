import React, {useEffect} from 'react'
import PropTypes from "prop-types"
import Header from "./components/Header";
import Body from "./components/Body";
import {connect} from "react-redux";
import {setPlatform} from "../../redux/actions/actions";
import Dashboard from "./components/asserts/Dashboard";
import Error404 from "./components/asserts/Error404";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ReactFullscreen from 'react-easyfullscreen';
import workWithServer from "../../core/workWithServer";

function Platform({match, setPlatform}) {

  const idPlatform = match.params['platformId']
  const activePage = match.params['page'] ? match.params['page'] : ''
  const pathToPlatform = '/platforms/' + idPlatform + '/'


  useEffect(() => {

    setPlatform({
      idPlatform,
      pathToPlatform,
      activePage
    })

    const answer = (data) => {
      console.log(data)
    }
    workWithServer.getPlatformInfo({
      name: idPlatform
    }, answer)

  }, [idPlatform, pathToPlatform, setPlatform, activePage])

  // статический список
  const navMenu = [
    {
      icon: 'dashboard',
      name: 'Дэшборд',
      href: '',
      component: (onToggleFullScreen) => <Dashboard onToggleFullScreen={onToggleFullScreen}/>
    },
    {
      icon: 'account_box',
      name: 'Лиды',
      href: 'leads'
    },
    {
      icon: 'account_box',
      name: 'Статистика',
      children: [
        {
          name: 'Аналитика',
          href: 'analitics'
        }
      ]
    },
    {
      icon: 'account_box',
      name: 'Финансы',
      href: 'finance'
    },
  ]

  let getCurrentPageComponent = <Error404/>
  for (let i in navMenu) {
    if (navMenu[i].href === activePage) {
      getCurrentPageComponent = navMenu[i].component
      break
    }
  }

  return (
    <ReactFullscreen>
      {({ref, onToggle}) => (
        <div ref={ref}>
          <Header navMenu={navMenu}/>
          <Body>
            {typeof getCurrentPageComponent === 'function' ?
              getCurrentPageComponent(onToggle) : getCurrentPageComponent}
          </Body>
        </div>
      )}
    </ReactFullscreen>
  )
}

Platform.propTypes = {
  match: PropTypes.object,
  setPlatform: PropTypes.func
}

function mapStateToProps(state) {
  return {
    platform: state.platform,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPlatform: (platform) => dispatch(setPlatform(platform)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Platform)