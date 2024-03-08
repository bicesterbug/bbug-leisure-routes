import { Button } from "@/components/ui/button";
import getRouteMetadata from "@/data/getRouteMetadata";
import getRoutes from "@/data/getRoutes"
import Link from "next/link";
import getRouteGeojson from "@/data/getRouteGeojson";
import getRoutePhotos from "@/data/getRoutePhotos";
import Image from "next/image";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
    const routes = await getRoutes();
    return routes.map(route => {
        return { route: route.id }
    })
}

export default async function Page({ params }: { params: { route: string } }) {
    const route = decodeURIComponent(params.route);
    const meta = await getRouteMetadata(route);
    const geojson = await getRouteGeojson(route);
    const photos = await getRoutePhotos(route);
    const RouteMap = dynamic(() => import('./RouteMap'), {ssr: false})
    return (
        <div>
            <div className="flex gap-4">
                <Link href={'/'}>Home</Link>
            </div>
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
            <h2>Map</h2>
            <div>
                <RouteMap routeGeojson={geojson} photoCollection={photos.features} />
            </div>
            <h2>Photos</h2>
            <div className="grid grid-cols-4 gap-4">
            {
                photos.photos.map((photoPath) => {
                    return (
                        <Image key={photoPath} src={`/routes/${route}/photos/${photoPath}`} width={400} height={400} alt={photoPath} />
                    )
                })
            }
            </div>
        </div>
    )
}