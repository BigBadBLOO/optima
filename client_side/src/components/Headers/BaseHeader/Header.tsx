import React, {useState} from "react";

 const Header: React.FC = () => {

    const initStateForNav = {
        balance: false,
        notifications: false,
        user: false
    }
    const [openNav, setOpenNav] = useState(initStateForNav)

    return (
        <>
          {/*  {*/}
          {/*      !user.emailIsConfirm &&*/}
          {/*      <div className="text-center text-white bg-blue-600 px-1">*/}
          {/*          Подтвердите адрес электронной почты*/}
          {/*          <span className="float-right margin-border-10" onClick={cancelConfirmEmail}>x</span>*/}
          {/*      </div>*/}
          {/*  }*/}

          {/*  <div className="flex justify-between h-16 p-2 bg-white">*/}
          {/*      <Logo/>*/}
          {/*      <div className="md:divide-x divide-gray-400 divide-opacity-50">*/}
          {/*          <NavDocumentation/>*/}
          {/*          <NavBalance balance={user.balance} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}

          {/*          <span className="text-gray-500">*/}
          {/*  <NavNotification openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}
          {/*  <NavUser user={user} initUser={initUser} openNav={openNav} setOpenNav={setOpenNav} initStateForNav={initStateForNav}/>*/}
          {/*</span>*/}
          {/*      </div>*/}
          {/*  </div>*/}
        </>
    )
}

export default Header