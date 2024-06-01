import { Link} from "react-router-dom";
import Header from "../../components/Header/header";
import Input from "../../components/Inputs/input";
import Label from "../../components/Label/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema, SigninType } from "../../components/schema/signinSchema";
import { UserLogin } from "../../services/userService";
import Cookies from "js-cookie"
import { useState } from "react";

export default function SignIn() {
  const [erro, setErro] = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>({ resolver: zodResolver(SigninSchema) });

  async function sendForm(data: SigninType) {
    const response = await UserLogin(data);
    if (!response) {
      setErro(true)
      return console.log({ message: "Erro ao iniciar sessão" });
    }
    setErro(false)
    Cookies.set("token", response.data)
    location.href = ("/tasks")
    reset();
  }

  return (
    <>
      <Header signupPage={false} signinPage={true} />
      <section className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
        <form
          onSubmit={handleSubmit(sendForm)}
          className="bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl"
        >
          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl text-center text-white mb-3">
              Login
            </legend>
            <span className="flex flex-col w-full ">
              <Label id="email" text="User email" />
              <Input register={register} name="email" type="email" id="email" />
              {errors.email && (
                <span className="text-[12.5px] text-red-600">
                  {errors.email.message}
                </span>
              )}
            </span>
            <span className="flex flex-col w-full ">
              <Label id="password" text="Password" />
              <Input
                register={register}
                name="password"
                type="password"
                id="password"
              />
              {errors.password && (
                <span className="text-[12.5px] text-red-600">
                  {errors.password.message}
                </span>
              )}
            </span>
            <span className="mt-5 mb-3 col-span-2 text-center">
              <button
                type="submit"
                className="text-md bg-slate-400 rounded-md p-1 pl-8 pr-8 hover:bg-slate-500"
              >
                Sign In
              </button>
            </span>
            {erro && (
                <span className="text-[12.5px] text-red-600">
                  User or password not found !
                </span>
              )}
          </fieldset>
          <Link to={"/forgout-password"} className="text-sm text-azul-primary underline">
            Forgout your password?
          </Link>
        </form>
      </section>
    </>
  );
}
