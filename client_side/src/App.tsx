//core
import React from "react";
import {useQuery} from "@apollo/client";
import {positions, Provider} from "react-alert";

//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import RouterNavbar from "@components/Routers/RouterNavbar";
import RouterNavbarNoAuth from "@components/Routers/RouterNavbarNoAuth";

//request
import User from '@gql/user.gql'
import clsx from "clsx";

const options = {
    timeout: 5000,
    position: positions.TOP_CENTER
};

const AlertTemplate = ({style, options, message, close}: any) => {
    return (
        <div
            style={{
                ...style,
                margin: 0
            }}
            className={clsx("h-12 p-2 w-screen text-center z-50",
                {
                    'bg-green-50 text-green-600': options.type === 'success',
                    'bg-red-50 text-red-600': options.type === 'error',
                    'bg-blue-50 text-blue-400': options.type === 'info',
                })}
            onClick={close}
        >
            {message}
        </div>
    )
}


const App: React.FC = () => {
    const {loading, data} = useQuery(User);

    if (loading) return <GlobalLoader/>;

    return <Provider template={AlertTemplate} {...options}>
        {
            data && data.getCurrentUser.group === 'CLIENT'
                ? <RouterNavbar/>
                : <RouterNavbarNoAuth/>
        }
    </Provider>
}

export default App;
