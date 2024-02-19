import getRoutes from "@/data/getRoutes"

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return {route}
    })
}

export default async function Page({params}: {params:{route:string}}) {
    const route = params.route;
    return (
        <h1>{route}</h1>
    )
}