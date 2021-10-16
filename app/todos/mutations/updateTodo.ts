import { Ctx, resolver } from "blitz"
import db from "db"
import { UpdateTodo } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateTodo),
  resolver.authorize(),
  async ({ id, ...data }, ctx: Ctx) => {
    const userId = ctx.session.userId as number

    const todo = await db.todo.updateMany({
      where: { id, userId },
      data,
    })

    return todo
  }
)
