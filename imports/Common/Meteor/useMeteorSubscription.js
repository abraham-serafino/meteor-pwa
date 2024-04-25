import { Meteor } from "meteor/meteor"
import { useTracker } from "meteor/react-meteor-data/suspense"
import { useMemo } from "react"

const useMeteorSubscription = ({
  Collection,
  subscriptionName,
  query = {},
  findOne = false
}) => {
  const isLoading = useTracker(() => {
    if (Meteor.isClient) {
      const { ready } = Meteor.subscribe(subscriptionName)
      return !ready()
    } else {
      return () => false
    }
  })

  const data = useTracker(async () => {
    if (Meteor.isClient) {
      const data = await Collection.find(query).fetchAsync()

      if (findOne) {
        return data[0]
      }

      return data
    }
  })

  return useMemo(() => [isLoading, data], [isLoading, data])
}

export default useMeteorSubscription
