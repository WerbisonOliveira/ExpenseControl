import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({children}) => {
    let {value, loadState} = useContext(AuthContext);

    if(loadState)
        return <p>Carregando...</p>

    return value ? children : <Navigate to="/login" />;
}

export default PrivateRoute;