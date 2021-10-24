import { ModelData, ListData } from "../types/services";
import { formatQuery } from "./services-helpers";
import { AllowedQueryKeys } from "./services.types";
import { deleteRequest, getRequest, patchRequest, postRequest } from "./utils";

// export const getAllSubscriptions = (query: AllowedQueryKeys) => getRequest<ReadonlyArray<ISubscription>>(`/subscriptions?${formatQuery(query)}`);

// export const getSubscription = (id: number) =>
//     getRequest<ISubscription>(`/subscriptions/${id}`);

// export const updateSubscription = (id: number, data: any) =>
//     patchRequest<ISubscription>(`/subscriptions/${id}`, data);

// export const updateSubscriptionStatus = (id: number, data: any) =>
//     patchRequest(`/subscriptions/status/update/${id}`, data);

// export const deleteSubscription = (id: number) =>
//     deleteRequest(`/subscriptions/${id}`);

// export const createSubscription = (data: any) =>
//     postRequest<ISubscription>(`/subscriptions`, data);

