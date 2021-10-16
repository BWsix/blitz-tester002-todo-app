import { Ctx, resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(
  resolver.authorize(),
  async ({ where }: Prisma.TodoFindManyArgs, ctx: Ctx) => {
    const userId = ctx.session.userId as number

    const todos = await db.todo.findMany({ where: { ...where, userId }, orderBy: { id: "asc" } })

    return todos
  }
)
