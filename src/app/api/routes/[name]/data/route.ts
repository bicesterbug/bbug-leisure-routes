import getRouteMetadata from "@/data/getRouteMetadata";
import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(name => ({name: name.id}))
}

export async function GET(request: Request, {params}: {params: {name: string}}) {
    const metadata = await getRouteMetadata(params.name)
    return Response.json(metadata)
}