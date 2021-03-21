//core
import React from "react";
import {useQuery} from "@apollo/client";

//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import RouterNavbar from "@components/Routers/RouterNavbarNoAuth";
import RouterNavbarNoAuth from "@components/Routers/RouterNavbarNoAuth";

//request
import GetCurrentUser from '@gql/user.gql'


const App: React.FC = () => {
    const {loading, error, data} = useQuery(GetCurrentUser);
    if (loading) return <GlobalLoader/>;
    return (
        <>
            {
                !error
                    ? <RouterNavbar/>
                    : <RouterNavbarNoAuth/>
            }
        </>
    )
}

export default App;
