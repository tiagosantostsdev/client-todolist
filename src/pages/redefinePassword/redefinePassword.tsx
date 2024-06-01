import { useForm } from "react-hook-form";
import Header from "../../components/Header/header";
import Input from "../../components/Inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CodeOTPSchema,
  CodeOTPType,
  RedefinePasswordSchema,
  RedefinePasswordType,
} from "../../components/schema/redefinePasswordSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Label from "../../components/Label/label";
import { redefinePassword } from "../../services/userService";

export default function RedefinePassword() {
  const navigate = useNavigate();
  const [formPassword, setFormPassword] = useState(false);
  const [getErro, setErro] = useState(false);

  const {
    register: registerOTP,
    reset: resetOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: erro },
  } = useForm<CodeOTPType>({ resolver: zodResolver(CodeOTPSchema) });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RedefinePasswordType>({
    resolver: zodResolver(RedefinePasswordSchema),
  });

  function sendForm(data: CodeOTPType) {
    Cookies.set("code", data.code, { expires: 1 });
    setFormPassword(true);
    resetOTP();
  }

  async function submit(data: RedefinePasswordType) {
    const response = await redefinePassword(data);
    if (!response) {
      setFormPassword(false);
      reset();
      setErro(true);
      return console.log("Falha ao redefinir senha!");
    }
    console.log(response);
    setErro(false);
    navigate("/auth/signin");
    setFormPassword(false);
    reset();
  }

  return (
    <>
      <Header signupPage={false} signinPage={false} />
      <section className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
        {formPassword ? (
          <form
            onSubmit={handleSubmit(submit)}
            className="bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl"
          >
            <fieldset className="flex flex-col items-center gap-2">
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
              <span className="mt-1 mb-3 col-span-2 text-center">
                <button
                  type="submit"
                  className="text-md bg-slate-400 rounded-md p-1 pl-8 pr-8 hover:bg-slate-500"
                >
                  Submit
                </button>
              </span>
            </fieldset>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitOTP(sendForm)}
            className="bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl"
          >
            <fieldset className="flex flex-col items-center gap-2">
              <legend className="text-xl text-center text-white mb-3">
                Please insert your verify code
              </legend>
              <Input
                placeholder="0 0 0 0 0 0"
                code={true}
                register={registerOTP}
                isNumber={false}
                name="code"
                maxLength={6}
                type="text"
                id="code"
              />
              {erro.code && (
                <span className="leading-[8px] text-[12.5px] text-red-600">
                  {erro.code.message}
                </span>
              )}
              {getErro && (
                <span className="leading-[8px] text-[12.5px] text-red-600">
                  Código de redefinição inválido, tente novamente!
                </span>
              )}
              <Link
                className="self-start text-blue-700 underline"
                to={"/forgout-password"}
              >
                resend code
              </Link>
              <span className="mt-1 mb-3 col-span-2 text-center">
                <button
                  type="submit"
                  className="text-md bg-slate-400 rounded-md p-1 pl-8 pr-8 hover:bg-slate-500"
                >
                  Submit
                </button>
              </span>
            </fieldset>
          </form>
        )}
      </section>
    </>
  );
}
