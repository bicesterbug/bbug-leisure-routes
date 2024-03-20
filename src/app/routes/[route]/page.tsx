import { Button } from "@/components/ui/button";
import getRouteMetadata from "@/data/getRouteMetadata";
import getRoutes from "@/data/getRoutes"
import Link from "next/link";
import getRouteGeojson from "@/data/getRouteGeojson";
import getRoutePhotos from "@/data/getRoutePhotos";
import Image from "next/image";
import dynamic from "next/dynamic";
import getBasePath from "@/data/getBasePath";
import ExportedImage from "next-image-export-optimizer";

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
    const RouteMap = dynamic(() => import('./RouteMap'), {ssr: false});
    const basePath = getBasePath();
    return (
        <div>
            <h2>{meta?.id}: {meta?.name}</h2>
            <h3>Download</h3>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href={`/api/routes/${params.route}/route.gpx`}>GPX</Link>
                </Button>
                <Button asChild>
                    <Link href={`/api/routes/${params.route}/route.geojson`}>GeoJSON</Link>
                </Button>
            </div>
            <h3>Map</h3>
            <div>
                <RouteMap routeGeojson={geojson} photoCollection={photos.features} />
            </div>
            <h3>Photos</h3>
            <div className="grid grid-cols-4 gap-4">
            {
                photos.photos.map((photoPath) => {
                    return (
                        <Link key={photoPath} href={`/photo?path=${basePath}/routes/${route}/photos/${photoPath}`}>
                            <ExportedImage src={`${basePath}/routes/${route}/photos/${photoPath}`} width={400} height={400} alt={photoPath} />
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}