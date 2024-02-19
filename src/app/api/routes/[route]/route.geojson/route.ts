import getRouteGeojson from "@/data/getRouteGeojson";
import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return {route}
    })
}

export async function GET(request: Request, {params}: {params: {route: string}}) {
    const route = await getRouteGeojson(params.route);
    return Response.json(route)
}