import React from "react";
import { Route, Switch } from "react-router-dom";
import CoursesCreate from "./pages/courses/views/courses-create";
import Home from "./pages/home";
import Subscriptions from "./pages/subscriptions/views";
import SubscriptionUpdate from "./pages/subscriptions/views/subcription-update";
import SubscriptionCreate from "./pages/subscriptions/views/subscription-create";
import UsersCreate from "./pages/users/views/users-create";
import { TRoute } from "./types/route";

const homeRoute: TRoute = {
    url: "/",
    component: Home,
};

const usersCreateRoute: TRoute = {
    url: "/users/create",
    component: UsersCreate,
};

const subscriptionsRoute: TRoute = {
    url: "/subscriptions",
    component: Subscriptions,
};

const subscriptionsCreateRoute: TRoute = {
    url: "/subscriptions/create",
    component: SubscriptionCreate
};

const subscriptionsUpdateRoute: TRoute = {
    url: "/subscriptions/update/:subId",
    component: SubscriptionUpdate
};

const CoursesCreateRoute: TRoute = {
    url: "/courses/create",
    component: CoursesCreate,
};
const routes = [
    {
        path: homeRoute.url,
        exact: true,
        main: () => <homeRoute.component />,
    },
    {
        path: subscriptionsRoute.url,
        exact: true,
        main: () => <subscriptionsRoute.component />,
    },
    {
        path: subscriptionsCreateRoute.url,
        exact: true,
        main: () => <subscriptionsCreateRoute.component />,
    },
    {
        path: subscriptionsUpdateRoute.url,
        exact: false,
        main: () => <subscriptionsUpdateRoute.component />,
    },
    {
        exact: true,
        path: usersCreateRoute.url,
        main: () => <usersCreateRoute.component />,
    },
    {
        exact: true,
        path: CoursesCreateRoute.url,
        main: () => <CoursesCreateRoute.component />,
    }
];

const AppRoutes: React.FC = () => (
    <Switch>
        {routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
            />
        ))}
    </Switch>
);

export { AppRoutes, routes };
