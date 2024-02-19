import getRoutes from "@/data/getRoutes"
import Link from "next/link";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return {route}
    })
}

export default async function Page({params}: {params:{route:string}}) {
    const route = params.route;
    return (
        <div>
        <h1>{route}</h1>
        <Link href={`/api/routes/${params.route}/route.gpx`}>Download Route</Link>
        </div>

    )
}