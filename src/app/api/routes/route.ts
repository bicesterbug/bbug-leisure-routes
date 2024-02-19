import getRoutes from "@/data/getRoutes";

export async function GET() {
    const routes = await getRoutes();
    return Response.json({
        routes
    })
}