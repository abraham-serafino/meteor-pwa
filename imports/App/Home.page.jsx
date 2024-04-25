import React from "react"
import { Link } from "react-router-dom"
import BooksPage, { bookLoader } from "/imports/Books/Books.page"
import routesFrom from "/imports/Common/lib/routesFrom"
import { Container } from "@mantine/core"

const HomeRoutes = [
  {
    path: "/books",
    loader: bookLoader,
    element: (data) => <BooksPage data={data} />
  }
]

// Roll up child routes so that relevant data loaders can be called on
// the server.
const AllRoutes = [...HomeRoutes]

function HomePage({ data }) {
  return (
    <Container>
      <h1>Meteor Booklist</h1>

      <p>
        <Link to="/books" className="underline">
          Book list
        </Link>
      </p>

      <div>{routesFrom(HomeRoutes, data)}</div>

      <h4>
        favicon created by{" "}
        <a href="https://www.flaticon.com/authors/popo2021">popo2021</a>
      </h4>
    </Container>
  )
}

export { HomeRoutes, AllRoutes }
export default HomePage
