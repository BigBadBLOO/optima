//core
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {createStore} from "redux";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import Cookies from 'js-cookie';

//components
import App from "@/App";

//config
import {serverURI} from "@/config/serverURI";
import rootReducer from "@redux/rootReducer";
import * as serviceWorker from '@/serviceWorker';

//styles
import "./index.css"
import "./public/css/fontRoboto.css"


const httpLink = createHttpLink({
    uri: `${serverURI}/graphql`,
});

const authLink = setContext((_, {headers}) => {
    const token = Cookies.get('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const store = createStore(rootReducer);

const application = (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
)

ReactDOM.render(application, document.getElementById('root'));

serviceWorker.unregister();