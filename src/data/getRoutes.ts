import { RouteMetadata } from "@/types/RouteMetadata";
import { readdir, readFile } from "fs/promises";
import path from "path";
import getRouteMetadata from "./getRouteMetadata";



export default async function getRoutes() {
    const routePath = path.resolve('./routes');
    console.log(routePath)
    const routeKeys = await readdir(routePath);
    const routes : RouteMetadata[] = [];

    for(let route of routeKeys) {
        const routeMeta = await getRouteMetadata(route);
        if(routeMeta) routes.push(routeMeta)
    }

    return routes;
}