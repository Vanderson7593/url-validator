import { Box } from "@material-ui/core";
import React, { FC } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useStyles } from "./side-bar.styles";

const SideBar: FC = ({ children }) => {

    const classes = useStyles()

    return (
        <Router>
            <Box className={classes.wrapper}>
                <Box className={classes.root}>
                    <ul className={classes.ul}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users/create">Create Users</Link>
                        </li>
                        <li>
                            <Link to="/courses/create">Create Course</Link>
                        </li>
                        <li>
                            <Link to="/subscriptions">List Subscriptions</Link>
                        </li>
                        <li>
                            <Link to="/subscriptions/create">Create Subscription</Link>
                        </li>
                    </ul>
                </Box>
                <Box display="flex" flex={1} justifyContent="center">{children}</Box>
            </Box>
        </Router>
    );
};

export default SideBar;
