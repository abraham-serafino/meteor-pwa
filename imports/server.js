import React from "react"
import { onPageLoad } from "meteor/server-render"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import App, { AllRoutes } from "/imports/App/App"
import executeRouteLoaders from "/imports/Common/lib/executeRouteLoaders"

onPageLoad(async (sink) => {
  let data = await executeRouteLoaders(sink?.request?.path, AllRoutes)

  sink.renderIntoElementById(
    "app",
    ReactDOMServer.renderToString(
      <StaticRouter location={sink.request.url}>
        {/* Server-side: pass the aggregated route loader data
        into the component tree as props. */}
        <App data={data} />
      </StaticRouter>
    )
  )

  sink.appendToBody(`
    <script>
        // Client-side: attach the stringified loader data to the window
        // so that it can be retrieved by hydration logic 
        window.__PRELOADED_STATE__ = ${JSON.stringify(data).replace(/</g, "\\u003c")}
    </script>
  `)
})
