import { Ctx, resolver } from "blitz"
import db from "db"
import { CreateTodo } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateTodo),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const data = CreateTodo.parse(input)
    const userId = ctx.session.userId as number

    const todo = await db.todo.create({ data: { userId, ...data } })

    return todo
  }
)
