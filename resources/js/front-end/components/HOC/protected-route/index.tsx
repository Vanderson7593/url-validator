import React, { FC, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

type ProtectedRoutesProps = {
    routes: Array<{ component: JSX.Element; path: string; exact: boolean }>;
};

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ routes }) => (
    <Switch>
        {routes.map(({ component, path, exact }) => (
            <Route path={path} key={path} exact={exact}>
                {component}
            </Route>
        ))}
    </Switch>
);

export default ProtectedRoutes;
