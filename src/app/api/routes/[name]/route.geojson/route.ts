import getRouteGeojson from "@/data/getRouteGeojson";
import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(name => ({name}))
}

export async function GET(request: Request, {params}: {params: {name: string}}) {
    const route = await getRouteGeojson(params.name);
    return Response.json(route)
}