import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";
import Label from "../../components/Label/label";
import Header from "../../components/Header/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from "../../components/schema/signupSchema";
import { CreateUser } from "../../services/userService";
import { useState } from "react";
import Load from "../../components/Load/load";

export default function SignUp() {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: zodResolver(SignUpSchema) });

  async function sendForm(data: SignUpType) {
    setIsLoading(true);
    const response = await CreateUser(data);
    if (!response) {
      setIsLoading(false);
      return console.log("Falha ao adicionar novo usuário!");
    }
    console.log({ message: "Novo usuário adicionado" });
    reset();
    setIsLoading(false);
    setVerify(true);
  }

  return (
    <>
      <Header signupPage={true} signinPage={false} />
      <section className="font-inter flex items-center justify-center w-full h-screen bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
        {verify ? (
          <div className="flex flex-col items-center justify-center bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl">
            <span
              onClick={() => navigate("/auth/signin")}
              className="self-end text-xl cursor-pointer"
            >
              <AiOutlineClose />
            </span>
            <span>
              <AiOutlineWarning className="text-yellow-600" size={80} />
            </span>
            <p className="text-green-500">Your account has been created</p>
            <p className="text-2xl text-red-500 mb-4">
              Please verify your email
            </p>
          </div>
        ) : isLoading ? (
          <Load />
        ) : (
          <form
            onSubmit={handleSubmit(sendForm)}
            className="bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl"
          >
            <fieldset className="grid grid-cols-2 gap-2">
              <legend className="text-xl text-center text-white mb-3">
                Create account
              </legend>
              <span className="flex flex-col w-full ">
                <Label id="firstName" text="First-name" />
                <Input
                  register={register}
                  name="firstName"
                  type="text"
                  id="firstName"
                />
                {errors.firstName && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.firstName?.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col w-full ">
                <Label id="lastName" text="Last-name" />
                <Input
                  register={register}
                  name="lastName"
                  type="text"
                  id="lastName"
                />
                {errors.lastName && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.lastName?.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col w-full col-span-2">
                <Label id="email" text="Email" />
                <Input
                  register={register}
                  name="email"
                  type="text"
                  id="email"
                />
                {errors.email && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.email?.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col w-full ">
                <Label id="date" text="Date-of-birth" />
                <Input
                  register={register}
                  name="date"
                  type="date"
                  id="date"
                  max={"2010-12-31"}
                />
                {errors.date && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.date?.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col w-full ">
                <Label id="gender" text="Gender" />
                <select
                  className="outline-azul-primary rounded-[5px] py-[5.9px]"
                  defaultValue={"g"}
                  {...register("gender")}
                  id="gender"
                >
                  <option disabled value={"g"}>
                    Select
                  </option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
                {errors.gender && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.gender?.message}
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
                    {errors.password?.message}
                  </span>
                )}
              </span>
              <span className="flex flex-col w-full ">
                <Label id="confirmPassword" text="Confirm-password" />
                <Input
                  register={register}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                />
                {errors.confirmPassword && (
                  <span className="text-[12.5px] text-red-600">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </span>
              <span className="mt-5 mb-3 col-span-2 text-center">
                <button
                  type="submit"
                  className="text-md bg-azul-primary rounded-md p-1 pl-8 pr-8 hover:bg-sky-700"
                >
                  Sign Up
                </button>
              </span>
            </fieldset>
            <span className="text-white text-sm">
              do you already have account?
              <Link to={"/auth/signin"} className="text-azul-primary underline">
                Sign In
              </Link>
            </span>
          </form>
        )}
      </section>
    </>
  );
}
