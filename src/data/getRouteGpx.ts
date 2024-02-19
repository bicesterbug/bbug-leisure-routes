import { readFile } from "fs/promises";
import path from "path";

export default async function getRouteGpx(route:string) {
    const routePath = path.resolve('./routes', route, 'route.gpx');
    console.log(routePath)
    const routeGpx = await readFile(routePath, {encoding:'utf8'});

    return routeGpx;
}