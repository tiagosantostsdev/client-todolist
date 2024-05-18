import { SigninType } from "./../components/schema/signinSchema";
import axios from "axios";
import { SignUpType } from "../components/schema/signupSchema";

const baseURL: string = String(import.meta.env.VITE_BASE_API_URL);

export const CreateUser = (data: SignUpType) => {
  const username: string = `${data.firstName} ${data.lastName}`
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    )
    .join(" ");

  //@ts-ignore
  delete data.firstName;
  //@ts-ignore
  delete data.lastName;
  //@ts-ignore
  delete data.confirmPassword;

  const response: any = axios
    .post(`${baseURL}/user/newuser`, {
      username: username,
      email: data.email,
      date: data.date,
      gender: data.gender,
      password: data.password,
    })
    .catch((error) => {
      return console.error({ message: error.response.data.message });
    });
  return response;
};

export const EmailVerify = (token: string) => {
  const response: any = axios
    .get(`${baseURL}/user/verify-email/${token}`)
    .catch((error) => {
      return console.log({ message: error.response.data.message });
    });
  return response;
};

export const UserLogin = (data: SigninType) => {
  const response: any = axios
    .post(`${baseURL}/auth/signin`, data)
    .catch((error) => {
      return console.log({ message: error.response.data.message });
    });
  return response;
};
