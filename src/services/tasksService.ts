import axios from "axios";
import Cookies from "js-cookie";
import { TaskType } from "../components/schema/tasksSchema";

const baseURL: string = String(import.meta.env.VITE_BASE_URL);

export const CreateTask = (data: TaskType) => {
  const response: any = axios
    .post(`${baseURL}/tasks/create`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
    .catch((error) => {
      return console.log(error);
    });
  return response;
};

export const GetTasks = () => {
  const response: string | any = axios
    .get(`${baseURL}/tasks`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .catch((error) => {
      return console.log(error);
    });
  return response;
};

export const DeleteTasks = (id: string) => {
  const response: any = axios
    .delete(`${baseURL}/tasks/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
    .catch((error) => {
      return console.log(error);
    });
  return response;
};

export const UpdateTasks = (id: string, task?: string, status?: boolean) => {
  const response: any = axios
    .patch(
      `${baseURL}/tasks/update/${id}`,
      {
        task: task,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    )
    .catch((error) => {
      return console.log(error);
    });
  return response;
};
