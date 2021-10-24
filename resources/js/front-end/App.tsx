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
import { Box } from "@material-ui/core";
import CreateUrl from "./pages/url/create";

type AuthContextProps = {
    user: IUser;
    logOut: () => void;
    logIn: (args: any) => void;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

const App: FC = () => {
    const [user, setUser] = useState<IUser>();
    const [accessToken, setAccessToken] = useLocalStorage(
        "accessToken",
        undefined
    );

    useEffect(() => {
        if (accessToken) {
            recoverUserData().then((response) => {
                if (response.status === "success") {
                    setUser(response.data as any);
                } else {
                    setUser(null);
                }
            });
        } else {
            setUser(null);
        }
    }, []);

    const logOut = async () => {
        const res = await logout();
        if (res.status === "success") {
            setAccessToken(undefined);
            setUser(null);
        }
    };

    const logIn = async (data: any) => {
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
            <BrowserRouter>
                <SnackbarProvider>
                    <Switch>
                        <Route
                            path={"/login"}
                            exact={true}
                            children={() =>
                                user ? (
                                    <Redirect to="/" />
                                ) : (
                                    <LoginRegister loginCallback={logIn} />
                                )
                            }
                        />
                        <Route
                            path={"/"}
                            exact={true}
                            children={
                                !user ? (
                                    <Redirect to="/login" />
                                ) : (
                                    <Home logOutCallback={logOut} user={user} />
                                )
                            }
                        />
                        <Route
                            path={"/url/create"}
                            exact={true}
                            children={<CreateUrl />}
                        />
                    </Switch>
                </SnackbarProvider>
            </BrowserRouter>
        </Box>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}

export const useAuthContext = () => useContext(AuthContext) as AuthContextProps;
