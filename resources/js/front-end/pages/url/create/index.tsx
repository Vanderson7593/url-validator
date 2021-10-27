import React, { FC, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress as Loader,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { IUrl } from "../../../types/url";
import { createUrl } from "../../../services/url";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "react-simple-snackbar";
import { useHistory } from "react-router-dom";
import { urlValidationSchema } from "../../../validators/url";

const CreateUrl: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IUrl>({
        resolver: yupResolver(urlValidationSchema) as any,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [openSnackbar, _] = useSnackbar();
    const history = useHistory();
    const handleFormSubmit = handleSubmit<IUrl>(async (userFormData) => {
        try {
            setLoading(true);
            const res = await createUrl(userFormData);
            if (res.status === "error") {
                Object.values(res.message).map((x) => {
                    openSnackbar(x);
                });
                return;
            }
            if (res.status === "success") {
                openSnackbar(res.message);
            }
        } catch (error) {
            Object.values(error).map((x) => {
                openSnackbar(x);
            });
            return;
        } finally {
            setLoading(false);
        }
    });

    if (loading) {
        return <Loader />;
    } else {
        return (
            <Box width={400}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Create URL</Typography>
                    <Button
                        onClick={() => history.push("/")}
                        variant="contained"
                    >
                        Go to URLs
                    </Button>
                </Box>
                <form onSubmit={handleFormSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        style={{ gap: 20 }}
                    >
                        <TextField
                            {...register("label")}
                            error={!!errors?.label?.message}
                            label="Label"
                            name="label"
                            type="text"
                            variant="filled"
                            helperText={errors?.label?.message}
                        />
                        <TextField
                            {...register("url")}
                            error={!!errors?.url?.message}
                            type="url"
                            label="Url"
                            name="url"
                            variant="filled"
                            placeholder="https://www.google.com"
                            helperText={errors?.url?.message}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Create URL
                        </Button>
                    </Box>
                </form>
            </Box>
        );
    }
};
export default CreateUrl;
