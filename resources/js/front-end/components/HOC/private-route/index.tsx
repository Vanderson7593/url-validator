import React, { FC } from "react";
import { Redirect, Route } from "react-router";

type TPrivateRoute = {
    hasUser: boolean;
    path: string;
};

const PrivateRoute: FC<TPrivateRoute> = ({ hasUser, children, path }) => {
    return (
        <Route
            path={path}
            render={({ location }) =>
                hasUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
