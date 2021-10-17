import { invalidateQuery, useMutation, useQuery } from "blitz"
import deleteTodos from "../mutations/deleteTodos"
import getTodos from "../queries/getTodos"
import { CreateTodoForm } from "./CreateTodoForm"
import { TodoGrid } from "./TodoGrid"

export const TodosList = () => {
  const [todos] = useQuery(getTodos, {})
  const [deleteCheckedTodoMutation] = useMutation(deleteTodos, {
    onSuccess: async () => await invalidateQuery(getTodos),
  })

  const todoContainsChecked = todos.map((todo) => todo.checked).includes(true)

  return (
    <>
      <TodoGrid todos={todos} />

      <div>
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
