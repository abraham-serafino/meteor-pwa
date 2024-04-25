import { Mongo } from "meteor/mongo"
import { Meteor } from "meteor/meteor"
import useMeteorSubscription from "/imports/Common/Meteor/useMeteorSubscription"
import { ValidatedMethod } from "/imports/Common/Meteor/ValidatedMethod"
import Joi from "joi"

const BOOKS = {
  FIND_ALL: "books.findAll",
  CREATE: "books.create",
  DELETE: "books.delete"
}

const Books = new Mongo.Collection(BOOKS.FIND_ALL)

if (Meteor.isServer) {
  Meteor.startup(async () => {
    // Create some sample data when the server starts.
    const result = await Books.find({}).fetchAsync()

    if (!result?.length) {
      await Books.insertAsync({
        author: "John Bunyan",
        title: "The Pilgrim's Progress"
      })

      await Books.insertAsync({
        author: "Jesus Christ",
        title: "Bible"
      })

      await Books.insertAsync({
        author: "Dale Carnegie",
        title: "How to Win Friends and Influence People"
      })
    }
  })

  Meteor.publish(BOOKS.FIND_ALL, () => Books.find({}))
}

const createBookSchema = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().required()
})

const BooksApi = {
  subscribe() {
    return useMeteorSubscription({
      Collection: Books,
      subscriptionName: BOOKS.FIND_ALL
    })
  },

  createBook: ValidatedMethod(
    BOOKS.CREATE,
    async ({ author, title }) => {
      return Books.upsertAsync({ author, title }, { author, title })
    },
    createBookSchema
  ),

  deleteBook: ValidatedMethod(
    BOOKS.DELETE,
    async (book) => {
      return await Books.removeAsync(book)
    },
    createBookSchema
  ),

  findAll() {
    return Books.find({}).fetchAsync()
  }
}

export { createBookSchema }
export default BooksApi
