import { ModelData } from "../types/services";
import { ICourse } from "../types/course";
import { getRequest, postRequest } from "./utils";

export const getAllCourses = () => getRequest<ReadonlyArray<ICourse>>(`/courses`);

export const getCourse = (id: number) =>
    getRequest<ModelData<ICourse>>(`/courses/${id}`);

export const createCourse = (data: any) =>
    postRequest<ModelData<ICourse>>('/courses', data);

