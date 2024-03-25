import getRouteMetadata from "@/data/getRouteMetadata";
import getRoutePhotos from "@/data/getRoutePhotos";
import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(name => ({name: name.id}))
}

export async function GET(request: Request, {params}: {params: {name: string}}) {
    const photos = await getRoutePhotos(params.name);
    const metadata = await getRouteMetadata(params.name)
    return Response.json(metadata)
}