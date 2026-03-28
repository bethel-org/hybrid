import axios from "axios";
import type { WorkoutSession } from "./mocks/workout";

export const api = axios.create({
  baseURL: "https://bethel-api-906437a92c34.herokuapp.com/",
  // baseURL: "http://localhost:3003/",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const getData = async <T = unknown>(
  endpoint: string,
  options = {},
): Promise<T> => {
  const { data } = await api.get<T>(endpoint, options);
  return data;
};

export const getResponse = async (endpoint: string, options = {}) => {
  return await api.get(endpoint, options);
};

export const post = async (endpoint: string, body?: unknown, config = {}) => {
  const response = await api.post(endpoint, body, config);
  return response?.data;
};

export const put = async (endpoint: string, body?: unknown, config = {}) => {
  const response = await api.put(endpoint, body, config);
  return response?.data;
};

export const deleteData = async (endpoint: string, options = {}) => {
  const { data } = await api.delete(endpoint, options);
  return data;
};

export const HYBRID_WORKOUT_PATH = "/hybrid-workout";

export const HYBRID_WORKOUT_QUERY_KEY = ["hybrid-workout"] as const;

export async function getHybridWorkout(): Promise<WorkoutSession> {
  return getData<WorkoutSession>(HYBRID_WORKOUT_PATH);
}

export async function putHybridWorkout(
  body: Partial<WorkoutSession> | WorkoutSession,
): Promise<WorkoutSession> {
  const data = await put(HYBRID_WORKOUT_PATH, body);
  return data as WorkoutSession;
}

export default api;
