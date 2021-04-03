//core
import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import Logo from "@components/Base/Logo/Logo";

//request
import User from "@gql/user.gql";



const Header: React.FC = () => {
  const {loading, error, data} = useQuery(User);

  if (loading) return <GlobalLoader/>

  const user = data.getCurrentUser

  const initStateForNav = {
    balance: false,
    notifications: false,
    user: false
  }
  const [openNav, setOpenNav] = useState(initStateForNav)

  const cancelConfirmEmail = () => {
  }

  const email_confirm_jsx = !user.emailIsConfirm &&
      <div className="text-center text-white bg-blue-500 px-1">
          Подтвердите адрес электронной почты
          <span className="material-icons float-right cursor-pointer" onClick={cancelConfirmEmail}>close</span>
      </div>
  return (
    <>
      {email_confirm_jsx}

      <div className="flex justify-between h-12 p-2 bg-white">
        <Logo/>

        <div className="md:divide-x divide-gray-400 divide-opacity-50">
          <Link to="/platforms/">
            <span className="text-gray-600 mx-2">Платформы</span>
          </Link>
          {/*          <NavDocumentation/>*/}
          {/*          <NavBalance balance={user.balance} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}

          {/*          <span className="text-gray-500">*/}
          {/*  <NavNotification openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}
          {/*  <NavUser user={user} initUser={initUser} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}
          {/*</span>*/}
        </div>
      </div>
    </>
  )
}

export default Header