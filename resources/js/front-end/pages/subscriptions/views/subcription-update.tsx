import React, { FC, useEffect, useState } from "react";
import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import useAsyncState from "../../../hooks/use-async-state";
import { useForm } from 'react-hook-form';
import { IUser } from "../../../types/user";
import { ECategories, EPeriods, EStatus } from "../../../constants";

import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from "react-router-dom";
import { ISubscription } from "../../../types/subcription";
import { ICourse } from "../../../types/course";
import { getAllCourses } from "../../../services/courses";
import { getSubscription, updateSubscription } from "../../../services/subscriptions";

interface ICreateSubscription extends ISubscription, IUser {
  password_confirmation: string
}

const SubscriptionUpdate: FC = () => {
  const { subId } = useParams<{ subId: string }>()
  const { errors, setErrors } = useAsyncState()
  const [subscription, setSubscription] = useState<ISubscription>({} as ISubscription);
  const { handleSubmit, register, reset, setValue } = useForm<ICreateSubscription>();
  const [category, setCategory] = useState<ECategories>(ECategories.STUDENT);
  const [period, setPeriod] = useState<EPeriods>(EPeriods.MORNING);
  const [status, setStatus] = useState<EStatus>(EStatus.UNPAID);
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const [courses, setCourses] = useState<ReadonlyArray<ICourse>>()
  const [selectedCourse, setSelectedCourse] = useState<number>('' as unknown as number)
  const [selectedCourses, setSelectedCourses] = useState<Array<ICourse>>([])

  const handleChange = (event: React.ChangeEvent<{ value: ECategories }>) => {
    setCategory(event.target.value as ECategories);
  };

  const handleChangePeriod = (event: React.ChangeEvent<{ value: EPeriods }>) => {
    setPeriod(event.target.value as EPeriods);
  };

  const handleChangeStatus = (event: React.ChangeEvent<{ value: EStatus }>) => {
    setStatus(event.target.value as EStatus);
  };

  const handleUpdateSubscription = async (formData: ICreateSubscription) => {
    return updateSubscription(subId as unknown as number, {
      ...formData,
      courses: selectedCourses.map(item => item.id)
    })
  }

  const handleFormSubmit = handleSubmit<ICreateSubscription>(async userFormData => {
    try {
      const res = await handleUpdateSubscription(userFormData)

      if (res.status === 'error') {
        setErrors(res.message as unknown as Record<string, string[]>)
        return
      }

      if (res.status === 'success') {
        openSnackbar(res.message as string)
        reset()
        setSelectedCourses([])
        setSelectedCourse('' as unknown as number)
      }
    } catch (error) {
      openSnackbar(error);
    }
  })

  const handleChangeCourse = (event: React.ChangeEvent<{ value: number }>) => {
    const courseId = event.target.value as number
    setSelectedCourse(courseId)
    const course = courses.filter(({ id }) => id === courseId)[0]
    setSelectedCourses(prevState => [...prevState, course])
  }

  const handleDeleteChip = (chipId: number) => {
    console.log(selectedCourses);
    setSelectedCourses(prevState => prevState.filter(({ id }) => id !== chipId))
  }

  useEffect(() => {
    reset()
    async function fetchCourses() {
      const res = await getAllCourses();
      setCourses(res.data);
    }
    async function fetchSubscription() {
      const res = await getSubscription(subId as unknown as number);
      setSubscription(res.data);
      setSelectedCourses(res.data.courses as unknown as Array<ICourse>);
      setCategory(res.data.user.category as ECategories)
      setValue('name', res.data.user.name as never)
      setValue('email', res.data.user.email as never)
      setValue('cpf', res.data.user.cpf as never)
      setValue('uf', res.data.user.uf as never)
      setValue('address', res.data.user.address as never)
      setValue('company', res.data.user.company as never)
      setValue('phone', res.data.user.phone as never)
      setValue('telephone', res.data.user.telephone as never)
      setValue('category', res.data.user.category as never)
      setValue('status', res.data.status as never)
      setValue('period', res.data.period as never)
    }

    fetchCourses()

    if (subId) {
      fetchSubscription()
    }
  }, []);

  return (
    <Box width={500}>
      <Typography variant="h4">Update subscription form</Typography>

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" style={{ gap: 20 }}>
          <TextField
            {...register("name")}
            error={!!errors?.name}
            label="Name"
            placeholder="Name"
            name="name"
            type="text"
            variant="filled"
            helperText={errors?.name}
          />

          <input hidden value="student" {...register("role")} />

          <TextField
            {...register("email")}
            error={!!errors?.email}
            type="email"
            label="Email"
            name="email"
            variant="filled"
            helperText={errors?.email}
          />

          <TextField
            {...register("cpf")}
            error={!!errors?.cpf}
            type="cpf"
            label="CPF"
            name="cpf"
            variant="filled"
            helperText={errors?.cpf}
          />

          <TextField
            {...register("uf")}
            error={!!errors?.uf}
            type="uf"
            label="UF"
            name="uf"
            variant="filled"
            helperText={errors?.uf}
          />

          <TextField
            {...register("address")}
            error={!!errors?.address}
            type="address"
            label="Address"
            name="address"
            variant="filled"
            helperText={errors?.address}
          />

          <TextField
            {...register("company")}
            error={!!errors?.company}
            type="company"
            label="Company"
            name="company"
            variant="filled"
            helperText={errors?.company}
          />

          <TextField
            {...register("phone")}
            error={!!errors?.phone}
            type="phone"
            label="Phone"
            name="phone"
            variant="filled"
            helperText={errors?.phone}
          />

          <TextField
            {...register("telephone")}
            error={!!errors?.telephone}
            type="telephone"
            label="Telephone"
            name="telephone"
            variant="filled"
            helperText={errors?.telephone}
          />

          <FormControl error={!!errors?.category}>
            <InputLabel>Category</InputLabel>
            <Select
              {...register("category")}
              name="category"
              label="Category"
              value={subscription?.user?.category || category}
              onChange={handleChange}
            >
              <MenuItem value={ECategories.STUDENT}>Student</MenuItem>
              <MenuItem value={ECategories.ASSOCIATE}>Associate</MenuItem>
              <MenuItem value={ECategories.PROFESSIONAL}>Professional</MenuItem>
            </Select>
            {
              errors?.category &&
              <FormHelperText>{errors?.category}</FormHelperText>
            }
          </FormControl>

          <FormControl error={!!errors?.status}>
            <InputLabel>Status</InputLabel>
            <Select
              {...register("status")}
              name="status"
              label="Status"
              value={subscription?.status || status}
              onChange={handleChangeStatus}
            >
              <MenuItem value={EStatus.UNPAID}>Unpaid</MenuItem>
              <MenuItem value={EStatus.PAID}>Paid</MenuItem>
              <MenuItem value={EStatus.CANCELLED}>Cancelled</MenuItem>
            </Select>
            {
              errors?.status &&
              <FormHelperText>{errors?.status}</FormHelperText>
            }
          </FormControl>

          <FormControl error={!!errors?.period}>
            <InputLabel>Period</InputLabel>
            <Select
              {...register("period")}
              name="period"
              label="Period"
              value={period}
              onChange={handleChangePeriod}
            >
              <MenuItem value={EPeriods.MORNING}>Morning</MenuItem>
              <MenuItem value={EPeriods.AFTERNOON}>Afternoon</MenuItem>
              <MenuItem value={EPeriods.NIGHT}>Night</MenuItem>
            </Select>
            {
              errors?.period &&
              <FormHelperText>{errors?.period}</FormHelperText>
            }
          </FormControl>

          <FormControl error={!!errors?.courses}>
            <InputLabel>Available Courses</InputLabel>
            <Select
              name="courses"
              label="Available courses"
              value={selectedCourse}
              onChange={handleChangeCourse}
            >
              {courses?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
            {
              errors?.courses && (
                <FormHelperText>{errors?.courses}</FormHelperText>)
            }
          </FormControl>

          <Box display="column" style={{ gap: 10 }}>
            <Typography>Selected courses</Typography>
            {
              (subscription?.courses || selectedCourses) &&
              selectedCourses?.map(({ name, id }) => (
                <Chip
                  style={{ margin: 3 }}
                  key={id}
                  label={name}
                  onDelete={() => handleDeleteChip(id)}
                />
              ))
            }
          </Box>

          <Button variant="contained" color="primary" type="submit">Submit form</Button>
        </Box>
      </form>
    </Box>
  );
}

export default SubscriptionUpdate;
