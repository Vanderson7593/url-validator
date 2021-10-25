import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Switch,
    Route,
    useHistory,
    Redirect,
} from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import LoginRegister from "./pages/login-register";
import { login, logout, recoverUserData } from "./services/users";
import useLocalStorage from "./hooks/use-local-storage";
import { IUser } from "./types/user";
import Home from "./pages/home";
import { Box, CircularProgress as Loader } from "@material-ui/core";
import CreateUrl from "./pages/url/create";
import PrivateRoute from "./components/HOC/private-route";
import ProtectedRoutes from "./components/HOC/protected-route";

const App: FC = () => {
    const [user, setUser] = useState<IUser>();
    const [accessToken, setAccessToken] = useLocalStorage(
        "accessToken",
        undefined
    );
    const [canMount, setCanMount] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (accessToken) {
            recoverUserData().then((response) => {
                if (response.status === "success") {
                    setUser(response.data as any);
                } else {
                    setUser(null);
                }
                setCanMount(true);
                setLoading(false);
            });
        } else {
            console.log("no access token");
            setUser(null);
            setCanMount(true);
            setLoading(false);
        }
    }, []);

    const logOut = async () => {
        setLoading(true);
        const res = await logout();
        if (res.status === "success") {
            setAccessToken(undefined);
            setUser(null);
            setLoading(false);
        }
    };

    const logIn = (data: any) => {
        setAccessToken(data.data.access_token);
        setUser(data.data.user);
    };

    return (
        <Box
            display="flex"
            height="100vh"
            width="100vw"
            justifyContent="center"
            alignItems="center"
        >
            {loading ? (
                <Loader />
            ) : (
                <>
                    {canMount && (
                        <BrowserRouter>
                            <SnackbarProvider>
                                <Switch>
                                    <Route
                                        path={"/login"}
                                        exact={true}
                                        children={
                                            <LoginRegister
                                                loginCallback={logIn}
                                            />
                                        }
                                    />
                                    <PrivateRoute
                                        path="/"
                                        hasUser={user ? true : false}
                                    >
                                        <ProtectedRoutes
                                            routes={[
                                                {
                                                    path: "/",
                                                    component: (
                                                        <Home
                                                            logOutCallback={
                                                                logOut
                                                            }
                                                            user={user}
                                                        />
                                                    ),
                                                    exact: true,
                                                },
                                                {
                                                    path: "/url/create",
                                                    component: <CreateUrl />,
                                                    exact: true,
                                                },
                                            ]}
                                        />
                                    </PrivateRoute>
                                </Switch>
                            </SnackbarProvider>
                        </BrowserRouter>
                    )}
                </>
            )}
        </Box>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
