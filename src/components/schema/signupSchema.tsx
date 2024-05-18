import z from "zod";

export const SignUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "Primeiro nome de usuário Obrigatório" })
      .min(3, { message: "Fisrt-name deve conter no mínimo 3 caracteres!" })
      .refine((value) => !/^\s*$/.test(value), {
        message: "First-name não pode conter apenas espaços em branco!",
      }),
    lastName: z
      .string({ required_error: "Apelido de usuário Obrigatório" })
      .min(3, { message: "Last-name deve conter no mínimo 3 caracteres!" })
      .refine((value) => !/^\s*$/.test(value), {
        message: "Last-name não pode conter apenas espaços em branco!",
      }),
    email: z
      .string({ required_error: "Email de usuário obrigatório!" })
      .email({ message: "Email inválido" }),
    date: z
      .string({ required_error: "Data de nascimento obrigatório!" })
      .min(8, { message: "Data de nascimento obrigatório!" }),
    gender: z
      .string({ required_error: "Selecione o gênero!" })
      .min(4, { message: "Selecione o gênero!" }),
    password: z
      .string()
      .min(8, { message: "Password deve conter no mínimo 8 caracteres!" })
      .refine(
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /\d/.test(value);
          return hasUpperCase && hasLowerCase && hasNumber;
        },
        {
          message:
            "Password deve conter letras maisculas, minusculas e números!",
        }
      ),
    confirmPassword: z
      .string({required_error:"Confirme a sua password!"}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem!",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
