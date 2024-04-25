import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { onPageLoad } from "meteor/server-render"
import { Meteor } from "meteor/meteor"
import App from "/imports/App/App"

import "@mantine/core/styles.css"

Meteor.startup(async () => {
  try {
    await navigator.serviceWorker.register("/sw.js")
    console.info("service worker registered")
  } catch (error) {
    console.error("ServiceWorker registration failed: ", error)
  }
})

onPageLoad(() => {
  // retrieve the dehydrated loader data
  const data = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  ReactDOM.createRoot(document.getElementById("react-target")).render(
    <BrowserRouter>
      {/* Pass the loader data to into the component tree as props.
        This must be done on the client side and the server side. */}
      <App data={data} />
    </BrowserRouter>
  )
})
