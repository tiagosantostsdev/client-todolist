import z from "zod";

export const ForgoutPasswordSchema = z.object({
  email: z
    .string({ required_error: "Por favor adicione o email de usuário!" })
    .email({ message: "Email inválido!" }),
});

export type ForgoutPasswordType = z.infer<typeof ForgoutPasswordSchema>;

export const CodeOTPSchema = z.object({
  code: z
    .string({
      required_error:
        "Adicione o código de redefinição de senha que foi enviado no seu email de usuário!",
    }).min(6, {message:"O código deve conter 6 digitos"})
});

export type CodeOTPType = z.infer<typeof CodeOTPSchema>;

export const RedefinePasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Digite a nova password!" })
      .min(8, { message: "A password deve conter no mínimo 8 caracteres" })
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
    confirmPassword: z.string({ required_error: "Confirme a password!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem!",
    path: ["confirmPassword"],
  });

export type RedefinePasswordType = z.infer<typeof RedefinePasswordSchema>;
