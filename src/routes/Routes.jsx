import { createBrowserRouter } from 'react-router-dom';

import { ContextDataProvider } from '../context/ContextData';

import PrivateRoute from './PrivateRoute';

// components
import App from "../App";
import Login from '../Pages/login/Login';
import Register from '../Pages/register/Register';
import Home from '../Pages/home/Home';
import General from '../Pages/home/General/General';
import Add from '../Pages/home/Add/Add';
import History from '../Pages/home/History/History';
import Settings from '../Pages/home/Settings/Settings';
import FormChangePassword from '../components/FormChangePassword/FormChangePassword';


export const router = createBrowserRouter([
    {
        path: "/ExpenseControl",
        element: <App />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "ResetPassword",
                element: <FormChangePassword />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "home",
                element: <PrivateRoute>
                            <ContextDataProvider>
                                <Home />
                            </ContextDataProvider>
                         </PrivateRoute>,
                children: [
                    {
                        path: "home",
                        element: <General />
                    },
                    {
                        path: "add",
                        element: <Add />
                    },
                    {
                        path: "history",
                        element: <History />
                    },
                    {
                        path: "settings",
                        element: <Settings />
                    }
                ]
            },
            
        ]
    }
])
