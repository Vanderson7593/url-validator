import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import SideBar from "./components/side-bar";
import SnackbarProvider from 'react-simple-snackbar'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <SideBar>
                <SnackbarProvider>
                    <AppRoutes />
                </SnackbarProvider>
            </SideBar>
        </BrowserRouter>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
