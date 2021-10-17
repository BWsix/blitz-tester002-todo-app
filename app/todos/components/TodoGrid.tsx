import { createTheme, darken, lighten } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { invalidateQuery, useMutation } from "blitz"
import { Todo } from "db"
import React from "react"
import updateTodo from "../mutations/updateTodo"
import getTodos from "../queries/getTodos"

const defaultTheme = createTheme()
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6)

    const getHoverBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5)

    return {
      root: {
        "& .checked": {
          backgroundColor: getBackgroundColor(theme.palette.text.disabled),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.text.disabled),
          },
        },
      },
    }
  },
  { defaultTheme }
)

const columns: GridColDef[] = [
  {
    field: "checked",
    headerName: "Done",
    description: "Double click to toggle checkbox",
    type: "boolean",
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: "title",
    headerName: "Title",
    description: "Double click to toggle edit box",
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    type: "dateTime",
    minWidth: 180,
    disableColumnMenu: true,
  },
  {
    field: "updatedAt",
    headerName: "Last modified",
    type: "dateTime",
    minWidth: 180,
    disableColumnMenu: true,
  },
]

interface TodoGridProps {
  todos: Todo[]
}

export const TodoGrid: React.FC<TodoGridProps> = ({ todos }) => {
  const [updateTodoMutation] = useMutation(updateTodo, {
    onSuccess: async () => {
      await invalidateQuery(getTodos)
    },
  })

  const classes = useStyles()
  return (
    <>
      <div style={{ height: 600, width: "100%" }} className={classes.root}>
        <DataGrid
          rows={todos}
          columns={columns}
          onCellEditCommit={async ({ id, field, value }: any) =>
            await updateTodoMutation({ id, [field]: value })
          }
          getRowClassName={(params) =>
            `${params.getValue(params.id, "checked") ? "checked" : null}`
          }
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  )
}
