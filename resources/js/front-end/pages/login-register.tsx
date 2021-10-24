import React, { FC, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Tabs,
    Tab,
} from "@material-ui/core";
import useAsyncState from "../hooks/use-async-state";
import { useForm } from "react-hook-form";
import { IUser } from "../types/user";
import { createUser, login } from "../services/users";

import { useSnackbar } from "react-simple-snackbar";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
});

const LoginRegister: FC<{ loginCallback: (args: any) => void }> = ({
    loginCallback,
}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IUser>();
    const [tab, setTab] = useState<number>(0);
    const [openSnackbar, _] = useSnackbar();

    const handleFormSubmit = handleSubmit<IUser>(async (userFormData) => {
        try {
            if (tab === 0) {
                const res = await login(userFormData);

                if (res.status === "error") {
                    openSnackbar(res.message[0]);
                    return;
                }

                if (res.status === "success") {
                    loginCallback(res);
                }
            } else {
                const res = await createUser(userFormData);

                if (res.status === "error") {
                    openSnackbar(res.message as string);
                    return;
                }

                if (res.status === "success") {
                    openSnackbar(res.message as string);
                    setTab(0);
                }
            }
        } catch (error) {
            openSnackbar(error[0]);
        }
    });

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    console.log(errors);

    return (
        <Box>
            <Box width={400}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="Login - Register Tabs"
                >
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <form onSubmit={handleFormSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        style={{ gap: 20 }}
                    >
                        <TextField
                            {...register("email")}
                            error={!!errors?.email}
                            type="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            // helperText={errors?.email}
                        />

                        <TextField
                            {...register("password")}
                            error={!!errors?.password}
                            type="password"
                            label="Password"
                            name="password"
                            variant="filled"
                            // helperText={errors?.password}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <form onSubmit={handleFormSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        style={{ gap: 20 }}
                    >
                        <TextField
                            {...register("name")}
                            error={!!errors?.name}
                            label="Name"
                            name="name"
                            type="text"
                            variant="filled"
                            // helperText={errors?.name}
                        />

                        <TextField
                            {...register("email")}
                            error={!!errors?.email}
                            type="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            // helperText={errors?.email}
                        />

                        <TextField
                            {...register("password")}
                            error={!!errors?.password}
                            type="password"
                            label="Password"
                            name="password"
                            variant="filled"
                            // helperText={errors?.password}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </TabPanel>
        </Box>
    );
};

export default LoginRegister;
