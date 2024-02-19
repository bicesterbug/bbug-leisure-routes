import { readFile, readdir } from "fs/promises";
import path from "path";
import exif from "exif-reader";
import { gpx } from "@tmcw/togeojson";
import { DOMParser } from "@xmldom/xmldom";
import { Feature, FeatureCollection, LineString } from "geojson";
import sharp from "sharp";
import {point, featureCollection} from "@turf/turf";

export default async function getRoutePhotos(route:string) {
    const routePath = path.resolve('./public/routes', route, 'photos');
    const routePhotoPaths = await readdir(routePath);
    const gpxTrackIndex = routePhotoPaths.findIndex((filename) => {
        return filename.endsWith('.gpx');
    });
    if(gpxTrackIndex !== -1) {
        const gpxTrackPath = routePhotoPaths.splice(gpxTrackIndex, 1);
        const trackGeojson = await getTrackGeojson(path.join(routePath, gpxTrackPath[0]));
        let routePhotos = [];

        for (const routePhotoPath of routePhotoPaths) {
            const photoBuff = await sharp(path.join(routePath, routePhotoPath)).metadata()
            const metadata = photoBuff.exif ? exif(photoBuff.exif) : null
            const originalDate = metadata && metadata.Photo?.DateTimeOriginal ? metadata.Photo.DateTimeOriginal : null;
            const nearestTime = trackGeojson.find(track => {
                if(!originalDate || !track.time) return false;
                return track.time > new Date(originalDate)
            })
            routePhotos.push(point(nearestTime?.coords, {
                path: path.join(`/routes/${route}/photos/${routePhotoPath}`)
            }))
        }

        return featureCollection(routePhotos)
    }

    return {
        photos: routePhotoPaths
    }
}

async function getTrackGeojson(path:string) {
    let result = [];
    const routeGpx = await readFile(path, {encoding: 'utf8'});
    const doc = new DOMParser().parseFromString(routeGpx, "text/xml");
    const geojson = gpx(doc) as FeatureCollection;
    const trackFeature = geojson.features.filter((feature: any) => {
        return feature.properties?._gpxType === "trk";
    })[0] as Feature<LineString>;

    const points = trackFeature.geometry?.coordinates?.map((coords:any, i) => {
        return {
            coords: coords,
            time: trackFeature.properties?.coordinateProperties?.times[i] ? new Date(trackFeature.properties.coordinateProperties.times[i]) : null
        }
    });


    return points
}