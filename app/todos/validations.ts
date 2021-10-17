import { z } from "zod"

export const GetTodo = z.object({
  id: z.number(),
})

export const CreateTodo = z.object({
  title: z.string().nonempty().max(50),
})

export const DeleteTodo = z.object({
  id: z.number().nonnegative(),
})

export const UpdateTodo = z.object({
  id: z.number().nonnegative(),
  checked: z.boolean().optional(),
  title: z.string().optional(),
})
