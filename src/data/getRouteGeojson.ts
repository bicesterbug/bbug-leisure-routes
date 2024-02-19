import { gpx } from "@tmcw/togeojson";
import getRouteGpx from "./getRouteGpx";
import { DOMParser } from "@xmldom/xmldom";

export default async function getRouteGeojson(route:string) {
    const routeGpx = await getRouteGpx(route);
    const doc = new DOMParser().parseFromString(routeGpx, "text/xml");
    const geojson = gpx(doc);
    return geojson
}