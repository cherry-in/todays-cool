import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../utils/context";
import ErrorPage from "../pages/ErrorPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user.id !== "") {
                    if (rest.role) {
                        if (rest.role === user.role) {
                            return <Component {...props} />;
                        } else {
                            return <ErrorPage />
                        }
                    } else {
                        return <Component {...props} />
                    }
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default PrivateRoute;