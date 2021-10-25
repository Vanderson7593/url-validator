import React, { FC, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Tabs,
    Tab,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IUser } from "../types/user";
import { createUser, login } from "../services/users";

import { useSnackbar } from "react-simple-snackbar";
import {
    loginValidationSchema,
    registerValidationSchema,
} from "../validators/auth";
import { useHistory } from "react-router";

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
    const [tab, setTab] = useState<number>(0);
    const [openSnackbar, _] = useSnackbar();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IUser>({
        resolver: yupResolver(
            tab === 0 ? loginValidationSchema : registerValidationSchema
        ),
    });

    const handleFormSubmit = handleSubmit<IUser>(async (userFormData) => {
        try {
            if (tab === 0) {
                const res = await login(userFormData);

                if (res.status === "error") {
                    Object.values(res.message).map((x) => {
                        openSnackbar(x);
                    });
                    return;
                }

                if (res.status === "success") {
                    loginCallback(res);
                    history.push("/");
                }
            } else {
                const res = await createUser(userFormData);

                if (res.status === "error") {
                    Object.values(res.message).map((x) => {
                        openSnackbar(x);
                    });
                    return;
                }

                if (res.status === "success") {
                    openSnackbar(res.message);
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
                            error={!!errors?.email?.message}
                            type="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            helperText={errors?.email?.message}
                        />

                        <TextField
                            {...register("password")}
                            error={!!errors?.password?.message}
                            type="password"
                            label="Password"
                            name="password"
                            variant="filled"
                            helperText={errors?.password?.message}
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
                            error={!!errors?.name?.message}
                            label="Name"
                            name="name"
                            type="text"
                            variant="filled"
                            helperText={errors?.name?.message}
                        />

                        <TextField
                            {...register("email")}
                            error={!!errors?.email?.message}
                            type="email"
                            label="Email"
                            name="email"
                            variant="filled"
                            helperText={errors?.email?.message}
                        />

                        <TextField
                            {...register("password")}
                            error={!!errors?.password?.message}
                            type="password"
                            label="Password"
                            name="password"
                            variant="filled"
                            helperText={errors?.password?.message}
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
