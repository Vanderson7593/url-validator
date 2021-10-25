import * as yup from 'yup';
import { EUser } from '../constants';

export const authValidationSchema = {
  [EUser.EMAIL]: yup.string().email().required(),
  [EUser.PASSWORD]: yup.string().min(6),
};

export const loginValidationSchema = yup.object().shape({
  ...authValidationSchema
})

export const registerValidationSchema = yup.object().shape({
  [EUser.Name]: yup.string().required(),
  ...authValidationSchema,
})