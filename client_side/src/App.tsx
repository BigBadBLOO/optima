//core
import React from "react";
import {useQuery} from "@apollo/client";

//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import RouterNavbar from "@components/Routers/RouterNavbar";
import RouterNavbarNoAuth from "@components/Routers/RouterNavbarNoAuth";

//request
import User from '@gql/user.gql'


const App: React.FC = () => {
  const {loading, error, data} = useQuery(User);
  if (loading) return <GlobalLoader/>;
  if (error) return <RouterNavbarNoAuth/>;
  console.log(data)
  return <RouterNavbar/>
}

export default App;
