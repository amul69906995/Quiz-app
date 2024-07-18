import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Layout from './Layout.jsx';
import EmailVerification from './components/EmailVerification.jsx';
import Login from './components/Login.jsx'
import Signin from './components/Signin.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "emailverification",
        element: <EmailVerification/>,
      },
  
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <RouterProvider router={router} />
   
  </React.StrictMode>
);
