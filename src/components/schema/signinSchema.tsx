import z from "zod";

export const SigninSchema = z.object({
  email: z
    .string({ required_error: "Digite o email de usuário!" })
    .email({ message: "Email inválido!" })
    .toLowerCase(),
  password: z.string({
    required_error: "Digite a senha de usuário!"
  }).min(2, {message: "Digite a senha de usuário!"}),
});

export type SigninType = z.infer<typeof SigninSchema>;
