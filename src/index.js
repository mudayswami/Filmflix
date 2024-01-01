import React from 'react';
import ReactDOM from "react-dom/client";
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={appStore}>
    <Body/>
   </Provider>
   );