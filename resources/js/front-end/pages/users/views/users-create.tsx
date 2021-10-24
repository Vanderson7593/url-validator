import React, { FC, useState } from "react";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import useAsyncState from "../../../hooks/use-async-state";
import { useForm } from 'react-hook-form';
import { IUser } from "../../../types/user";
import { ERoles } from "../../../constants";
import { createUser } from "../../../services/users";

import { useSnackbar } from 'react-simple-snackbar'

interface ICreateUser extends IUser {
  password_confirmation: string
}

const UsersCreate: FC = () => {
  const { errors, setErrors } = useAsyncState()
  const { handleSubmit, register } = useForm<ICreateUser>();
  const [role, setRole] = useState<ERoles>(ERoles.OPERATOR);
  const [openSnackbar, _] = useSnackbar()

  const handleChange = (event: React.ChangeEvent<{ value: ERoles }>) => {
    setRole(event.target.value as ERoles);
  };

  const handleFormSubmit = handleSubmit<ICreateUser>(async userFormData => {

    try {
      const res = await createUser(userFormData);

      if (res.status === 'error') {
        setErrors(res.message as unknown as Record<string, string[]>)
        return
      }

      if (res.status === 'success') {
        openSnackbar(res.message as string)
      }
    } catch (error) {
      openSnackbar(error);
    }
  })

  return (
    <Box width={400}>
      <Typography variant="h4">Create user form</Typography>

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" style={{ gap: 20 }}>
          <TextField
            {...register("name")}
            error={!!errors?.name}
            label="Name"
            name="name"
            type="text"
            variant="filled"
            helperText={errors?.name}
          />

          <TextField
            {...register("email")}
            error={!!errors?.email}
            type="email"
            label="Email"
            name="email"
            variant="filled"
            helperText={errors?.email}
          />

          <FormControl error={!!errors?.role}>
            <InputLabel id="demo-simple-select-error-label">Name</InputLabel>
            <Select
              {...register("role")}
              name="role"
              label="Role"
              value={role}
              onChange={handleChange}
            >
              <MenuItem value={ERoles.OPERATOR}>Operator</MenuItem>
              <MenuItem value={ERoles.ADMIN}>Admin</MenuItem>
            </Select>
            {
              errors?.role &&
              <FormHelperText>{errors?.role}</FormHelperText>
            }
          </FormControl>

          <TextField
            {...register("password")}
            error={!!errors?.password}
            type="password"
            label="Password"
            name="password"
            variant="filled"
            helperText={errors?.password}
          />

          <TextField
            {...register("password_confirmation")}
            error={!!errors?.password}
            type="password"
            label="Password confirm"
            name="password_confirmation"
            variant="filled"
            helperText={errors?.password}
          />

          <Button variant="contained" color="primary" type="submit">Submit form</Button>
        </Box>
      </form>
    </Box>
  );
};
export default UsersCreate;
