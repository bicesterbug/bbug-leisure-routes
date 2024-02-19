import getRouteGpx from "@/data/getRouteGpx";
import getRoutes from "@/data/getRoutes"

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return {route}
    })
}

export async function GET(request: Request, {params}: {params: {route: string}}) {
    const routeGpx = await getRouteGpx(params.route);

    return new Response(routeGpx, {headers: {
        "Content-Type": "application/gpx+xml"
    }})
}