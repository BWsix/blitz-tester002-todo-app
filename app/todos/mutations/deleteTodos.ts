import { Ctx, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (_, ctx: Ctx) => {
  const userId = ctx.session.userId as number
  const todo = await db.todo.deleteMany({ where: { userId, checked: true } })

  return todo
})
