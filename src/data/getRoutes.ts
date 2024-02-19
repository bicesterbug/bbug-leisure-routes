import { readdir } from "fs/promises";
import path from "path";

export default async function getRoutes() {
    const routePath = path.resolve('./routes');
    console.log(routePath)
    const routes = await readdir(routePath);

    return routes;
}