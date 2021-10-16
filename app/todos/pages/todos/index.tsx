import Layout from "app/core/layouts/Layout"
import { CreateTodoForm } from "app/todos/components/CreateTodoForm"
import deleteTodos from "app/todos/mutations/deleteTodos"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { BlitzPage, Head, invalidateQuery, Link, Routes, useMutation, useQuery } from "blitz"
import { Suspense } from "react"

export const TodosList = () => {
  const [todos] = useQuery(getTodos, {})
  const [updateTodoMutation] = useMutation(updateTodo, {
    onSuccess: async () => await invalidateQuery(getTodos),
  })
  const [deleteCheckedTodoMutation] = useMutation(deleteTodos, {
    onSuccess: async () => await invalidateQuery(getTodos),
  })

  const todoContainsChecked = todos.map((todo) => todo.checked).includes(true)

  return (
    <>
      {todos.length ? "todos :" : "(no todo)"}

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              readOnly
              onClick={() => {
                updateTodoMutation({ id: todo.id, checked: !todo.checked })
              }}
            />
            <Link href={Routes.ShowTodoPage({ todoId: todo.id })}>
              <a>{todo.title}</a>
            </Link>
          </div>
        ))}
        ------------------
        <div>
          <button
            disabled={!todoContainsChecked}
            onClick={async () => {
              await deleteCheckedTodoMutation()
            }}
          >
            delete checked
          </button>
        </div>
        ------------------
        <div>
          <CreateTodoForm />
        </div>
      </div>
    </>
  )
}

const TodosPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TodosList />
        </Suspense>
      </div>
    </>
  )
}

TodosPage.authenticate = true
TodosPage.getLayout = (page) => <Layout>{page}</Layout>

export default TodosPage
