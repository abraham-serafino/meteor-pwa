import React, { useState, useEffect } from "react"
import BooksApi from "./Books.api"
import BookForm from "./Book.form"
import { Anchor, Space } from "@mantine/core"

async function bookLoader() {
  const books = await BooksApi.findAll()
  return { books }
}

function BooksPage({ data }) {
  let [isLoading, bookResults] = BooksApi.subscribe()
  // Use bookLoader() data until the client-side subscription
  // has finished loading.
  const [books, setBooks] = useState(data?.books)

  useEffect(() => {
    if (!isLoading && bookResults?.length) {
      setBooks(bookResults)
    }
  }, [isLoading, (bookResults || []).length])

  const handleAddBook = async (newBook) => {
    BooksApi.createBook(newBook)
  }

  const handleDeleteBook = async (book) => {
    await BooksApi.deleteBook(book)
  }

  return (
    <div>
      <BookForm addBook={handleAddBook} />

      <Space h="md" />

      {books?.map(({ title, author }) => {
        return (
          <div key={`${title} - ${author}`}>
            <i>"{title}"</i> - {author}{" "}
            <Anchor onClick={() => handleDeleteBook({ author, title })}>
              X
            </Anchor>
          </div>
        )
      })}
    </div>
  )
}

export { bookLoader }
export default BooksPage
