import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={redirectTo} replace />
        )
      }
    />
  );
};

export default PrivateRoute;
