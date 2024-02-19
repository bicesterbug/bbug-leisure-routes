import { Button } from "@/components/ui/button";
import getRouteMetadata from "@/data/getRouteMetadata";
import getRoutes from "@/data/getRoutes"
import Link from "next/link";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return { route: route.id }
    })
}

export default async function Page({ params }: { params: { route: string } }) {
    const route = params.route;
    const meta = await getRouteMetadata(route);
    return (
        <div>
            <h1>{meta?.id}: {meta?.name}</h1>
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