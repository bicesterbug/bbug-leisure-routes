import getRouteGpx from "@/data/getRouteGpx";
import getRoutes from "@/data/getRoutes"

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(name => ({name: name.id}))
}

export async function GET(request: Request, {params}: {params: {name: string}}) {
    const routeGpx = await getRouteGpx(params.name);

    return new Response(routeGpx, {headers: {
        "Content-Type": "application/gpx+xml"
    }})
}