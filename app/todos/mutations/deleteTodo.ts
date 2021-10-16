import { Ctx, resolver } from "blitz"
import db from "db"
import { DeleteTodo } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteTodo),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const userId = ctx.session.userId as number
    const todo = await db.todo.deleteMany({ where: { userId, id } })

    return todo
  }
)
