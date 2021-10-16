import Layout from "app/core/layouts/Layout"
import getTodo from "app/todos/queries/getTodo"
import { BlitzPage, Head, Link, Routes, useParam, useQuery } from "blitz"
import { Suspense } from "react"

export const Todo = () => {
  const todoId = useParam("todoId", "number")
  const [todo] = useQuery(getTodo, { id: todoId })

  return (
    <>
      <Head>
        <title>{todo.title}</title>
      </Head>

      <div>
        <h1>Todo #{todo.id}</h1>
        <pre>{JSON.stringify(todo, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TodosPage()}>
          <a>Todos</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Todo />
      </Suspense>
    </div>
  )
}

ShowTodoPage.authenticate = true
ShowTodoPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTodoPage
