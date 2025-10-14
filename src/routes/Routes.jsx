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
                path: "/ExpenseControl/login",
                element: <Login />
            },
            {
                path: "/ExpenseControl/ResetPassword",
                element: <FormChangePassword />
            },
            {
                path: "/ExpenseControl/register",
                element: <Register />
            },
            {
                path: "/ExpenseControl/home",
                element: <PrivateRoute>
                            <ContextDataProvider>
                                <Home />
                            </ContextDataProvider>
                         </PrivateRoute>,
                children: [
                    {
                        path: "/ExpenseControl/home",
                        element: <General />
                    },
                    {
                        path: "/ExpenseControl/home/add",
                        element: <Add />
                    },
                    {
                        path: "/ExpenseControl/home/history",
                        element: <History />
                    },
                    {
                        path: "/ExpenseControl/home/settings",
                        element: <Settings />
                    }
                ]
            },
            
        ]
    }
])
