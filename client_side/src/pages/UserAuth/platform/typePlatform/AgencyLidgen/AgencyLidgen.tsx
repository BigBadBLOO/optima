//core
import React from "react";

//components
import Header from "@pages/UserAuth/platform/typePlatform/AgencyLidgen/components/Header";

//pages
import PageNotFound from "@pages/ErrorPages/PageNotFound404";
import ControlPersonal from "@pages/UserAuth/platform/typePlatform/AgencyLidgen/pages/controlPersonal/СontrolPersonal";

type AgencyLidgenType = {
  pathToPlatform: string
  activePage: string
}

const AgencyLidgen: React.FC<AgencyLidgenType> = ({pathToPlatform, activePage}) => {

  const header_navigation = [
    {
      path: pathToPlatform + '/',
      name: 'Дэшборд',
      active: activePage === undefined,
      icon: 'dashboard',
      component: <div>Dashboard</div>
    },
    {
      name: 'Сотрудники',
      icon: 'people',
      child: [
        {
          path: pathToPlatform + '/controlPersonal',
          name: 'Управление сотрудниками',
          active: activePage === 'controlPersonal',
          component: <ControlPersonal/>
        },
        {
          path: pathToPlatform + '/efficiencyPersonal',
          name: 'Эффективность сотрудников',
          active: activePage === 'efficiencyPersonal',
          component: <div>Эффективность сотрудников</div>
        }
      ]
    }
  ]

  let active_page_jsx = <PageNotFound/>

  header_navigation.forEach(el => {
    if (el.child) {
      el.child.forEach(child => {
          if (child.active) active_page_jsx = child.component
        }
      )
    } else if (el.active) active_page_jsx = el.component
  })

  return (
    <div>
      <Header navList={header_navigation}/>
      <div className="bg-gray-100 fixed w-full h-full left-0 top-0 mt-12 z-0 p-6 md:pl-20">
        {active_page_jsx}
      </div>
    </div>
  )
}

export default AgencyLidgen