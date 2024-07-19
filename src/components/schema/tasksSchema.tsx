import z from "zod";

export const TaskSchema = z.object({
  task: z
    .string({ required_error: "Adicone a tarefa por favor!" })
    .min(4, { message: "A tarefa deve conter no minímo 4 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Este campo não pode conter apenas espaços em branco!",
    }),
});

export type TaskType = z.infer<typeof TaskSchema>;
