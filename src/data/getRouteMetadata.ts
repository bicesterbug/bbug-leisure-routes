import { RouteMetadata } from "@/types/RouteMetadata";
import { readFile } from "fs/promises";
import path from "path";


export default async function getRouteMetadata(key:string) : Promise<RouteMetadata | null> {
    const routePath = path.resolve('./public/routes', key, 'meta.json');
    let metadata:RouteMetadata | null = null;
    try {
        const metadataString = await readFile(routePath, {encoding: 'utf8'});
        return JSON.parse(metadataString)
    } catch (err) {
        return null;
    }

}