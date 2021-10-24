import React, { FC } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { IUrl } from "../../types/url";
import { createUrl } from "../../services/url";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "react-simple-snackbar";
import { useHistory } from "react-router-dom";
import { urlValidationSchema } from "./create/validation";

const CreateUrl: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IUrl>({
        resolver: yupResolver(urlValidationSchema) as any,
    });
    const [openSnackbar, _] = useSnackbar();
    const history = useHistory();
    const handleFormSubmit = handleSubmit<IUrl>(async (userFormData) => {
        try {
            const res = await createUrl(userFormData);
            if (res.status === "error") {
                openSnackbar(res.message);
                return;
            }
            if (res.status === "success") {
                openSnackbar(res.message);
            }
        } catch (error) {
            openSnackbar(error[0]);
        }
    });
    return (
        <Box width={400}>
            <Typography variant="h4">Create URL</Typography>
            <form onSubmit={handleFormSubmit}>
                <Box display="flex" flexDirection="column" style={{ gap: 20 }}>
                    <TextField
                        {...register("label")}
                        error={!!errors?.label}
                        label="Label"
                        name="label"
                        type="text"
                        variant="filled"
                        helperText={errors?.label}
                    />
                    <TextField
                        {...register("url")}
                        error={!!errors?.url}
                        type="url"
                        label="Url"
                        name="url"
                        variant="filled"
                        helperText={errors?.url}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Submit form
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
export default CreateUrl;
