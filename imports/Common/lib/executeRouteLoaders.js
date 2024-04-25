import UrlPattern from "url-pattern";

async function executeRouteLoaders(forPath, Routes) {
    let data = {}

    for (const { path, loader } of Routes) {
        if (
            new UrlPattern(path).match(forPath) &&
            typeof loader === "function"
        ) {
            const newData = await loader()

            data = {
                ...data,
                ...newData
            }
        }
    }

    return data
}

export default executeRouteLoaders
