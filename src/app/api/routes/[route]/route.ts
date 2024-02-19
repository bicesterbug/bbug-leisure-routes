import getRoutes from "@/data/getRoutes";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return {route}
    })
}

export async function GET(request: Request, {params}: {params: {route: string}}) {
    return Response.json({key: params.route})
}