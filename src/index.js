import React from 'react';
import ReactDOM from "react-dom/client";
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
import { Login } from './components/Login';
import { Header } from './components/Header';
const approuter = createBrowserRouter([
   {
    path:"/",
    element: <Login />
   }   

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={approuter} />);