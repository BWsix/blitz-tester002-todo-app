import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { GetTodo } from "../validations"

export default resolver.pipe(
  resolver.zod(GetTodo),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const userId = ctx.session.userId as number

    const todo = await db.todo.findFirst({ where: { userId, id } })

    if (!todo) throw new NotFoundError()

    return todo
  }
)
