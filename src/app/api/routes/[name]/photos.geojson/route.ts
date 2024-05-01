import getRoutePhotos from "@/data/getRoutePhotos";
import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(name => ({name: name.id}))
}

export async function GET(request: Request, {params}: {params: {name: string}}) {
    try {
        const photos = await getRoutePhotos(params.name);
        return Response.json(photos)
    } catch(err) {
        return Response.json({});
    }

}