import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgoutPasswordSchema,
  ForgoutPasswordType,
} from "../../components/schema/redefinePasswordSchema";
import Label from "../../components/Label/label";
import Input from "../../components/Inputs/input";
import { requestRedefinePassword } from "../../services/userService";
import Cookies from "js-cookie";
import { useState } from "react";

export default function ForgoutPassword() {
  const navigate = useNavigate();
  const [getErro, setErro] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgoutPasswordType>({
    resolver: zodResolver(ForgoutPasswordSchema),
  });

  async function sendForm(data: ForgoutPasswordType) {
    const response = await requestRedefinePassword(data.email);
    if (!response) {
      setErro(true);
      return console.log(
        "Falha ao solicitar código de redefinição da password"
      );
    }
    setErro(false);
    console.log(response);
    Cookies.set("email", data.email, { expires: 1 });
    navigate("/redefine-password");
    reset();
  }
  return (
    <>
      <Header signupPage={false} signinPage={false} />
      <section className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
        <form
          onSubmit={handleSubmit(sendForm)}
          className="bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl"
        >
          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl text-center text-white mb-3">
              Forgout Password
            </legend>
            <span className="bg-gray-400 rounded p-1">
              Adicione o seu email de usuário para verificar e receber o código
              de validação de email!
            </span>
            <span className="flex flex-col w-full ">
              <Label id="email" text="User email" />
              <Input register={register} name="email" type="email" id="email" />
              {errors.email && (
                <span className="text-[12.5px] text-red-600">
                  {errors.email.message}
                </span>
              )}
              {getErro && (
                <span className="text-[12.5px] text-red-600">
                  Email de usuário não encontrado!
                </span>
              )}
            </span>
            <span className="mt-5 mb-3 col-span-2 text-center">
              <button
                type="submit"
                className="text-md bg-slate-400 rounded-md p-1 pl-8 pr-8 hover:bg-slate-500"
              >
                Submit
              </button>
            </span>
          </fieldset>
        </form>
      </section>
    </>
  );
}
