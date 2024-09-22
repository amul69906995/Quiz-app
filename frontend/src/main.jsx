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
import ProtectedLayout from './ProtectedLayout.jsx';
import Home from './components/Home.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Quiz from './components/Quiz.jsx';
import QuestionProvider from './context/QuestionProvider.jsx';
import Score from './components/Score.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
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
      {
        path:'protected',
        element:<ProtectedLayout/>,
        children:[
          {
            path:'home',
            element:<Home/>
          },
          {
            path:'quiz',
            element:<Quiz/>
          },
          {
            path:'score',
            element:<Score/>
          }
        ]
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QuestionProvider>
      <RouterProvider router={router} />
      </QuestionProvider>
      </AuthProvider>
  </React.StrictMode>
);
