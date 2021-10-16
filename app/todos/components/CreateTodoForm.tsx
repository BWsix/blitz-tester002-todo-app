import createTodo from "app/todos/mutations/createTodo"
import getTodos from "app/todos/queries/getTodos"
import { invalidateQuery, useMutation, validateZodSchema } from "blitz"
import { Field, Form } from "react-final-form"
import { CreateTodo } from "../validations"

export const CreateTodoForm = () => {
  const [createTodoMutation] = useMutation(createTodo, {
    onSuccess: async () => {
      await invalidateQuery(getTodos)
    },
  })

  return (
    <Form
      onSubmit={async (data: { title: string }, form) => {
        try {
          await createTodoMutation(data)
          form.restart()
        } catch (error) {
          window.alert(error)
        }
      }}
      validate={validateZodSchema(CreateTodo)}
      render={({ handleSubmit, submitting, valid }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title">
            {({ input, meta }) => (
              <div>
                <label>Todo Title : </label>
                <input {...input} type="text" placeholder="todo title" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={!valid || submitting}>
            Create Todo!
          </button>
        </form>
      )}
    />
  )
}
