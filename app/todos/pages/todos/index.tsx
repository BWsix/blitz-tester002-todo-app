import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head } from "blitz"
import { Suspense } from "react"
import { TodosList } from "../../components/TodosList"

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
