import { Button } from "@/components/ui/button";
import getRoutes from "@/data/getRoutes"
import Link from "next/link";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return { route }
    })
}

export default async function Page({ params }: { params: { route: string } }) {
    const route = params.route;
    return (
        <div>
            <h1>{route}</h1>
            <h2>Download</h2>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href={`/api/routes/${params.route}/route.gpx`}>GPX</Link>
                </Button>
                <Button asChild>
                    <Link href={`/api/routes/${params.route}/route.geojson`}>GeoJSON</Link>
                </Button>
            </div>
        </div>

    )
}