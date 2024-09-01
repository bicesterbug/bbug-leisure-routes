import { readFile, readdir } from "fs/promises";
import path from "path";
import exif, { GPSInfoTags } from "exif-reader";
import { gpx } from "@tmcw/togeojson";
import { DOMParser } from "@xmldom/xmldom";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import sharp from "sharp";
import {point } from "@turf/turf";

export default async function getRoutePhotos(route:string) : Promise<{photos:string[], features:FeatureCollection<Point>}> {
    const routePath = path.resolve('./public/routes', route, 'photos');
    const routePhotoPaths = await readdir(routePath);
    const gpxTrackIndex = routePhotoPaths.findIndex((filename) => {
        return filename.endsWith('.gpx');
    });
    let featureCollection:FeatureCollection<Point> = {type: "FeatureCollection", features:[]};
    if(gpxTrackIndex !== -1) {
        const gpxTrackPath = routePhotoPaths.splice(gpxTrackIndex, 1);
        const trackGeojson = await getTrackGeojson(path.join(routePath, gpxTrackPath[0]));

        for (const routePhotoPath of routePhotoPaths) {
            if(routePhotoPath.endsWith('.jpg')) {
                const photoBuff = await sharp(path.join(routePath, routePhotoPath)).metadata()
                const metadata = photoBuff.exif ? exif(photoBuff.exif) : null
                const originalDate = metadata && metadata.Photo?.DateTimeOriginal ? metadata.Photo.DateTimeOriginal : null;
                const nearestTime = trackGeojson.find(track => {
                    if(!originalDate || !track.time) return false;
                    return track.time > new Date(originalDate)
                })
                if(nearestTime?.coords) {
                    featureCollection.features.push(point(nearestTime?.coords, {
                        path: path.join(`/routes/${route}/photos/${routePhotoPath}`)
                    }))
                }
            }
        }
    } else {
        for (const routePhotoPath of routePhotoPaths) {
            if(routePhotoPath.endsWith('.jpg')) {
                const photoBuff = await sharp(path.join(routePath, routePhotoPath)).metadata()
                const metadata = photoBuff.exif ? exif(photoBuff.exif) : null
                const originalDate = metadata && metadata.Photo?.DateTimeOriginal ? metadata.Photo.DateTimeOriginal : null;
                if(metadata && metadata.GPSInfo) {
                    const point = gpsToCoords(metadata.GPSInfo, routePhotoPath)
                    if(point) {
                        featureCollection.features.push(point);
                    }
                }
            }
        }
    }

    return {
        photos: routePhotoPaths.filter(value => value.endsWith('.jpg')),
        features: featureCollection
    }
}

function gpsToCoords(gpsInfo:Partial<GPSInfoTags>, path:string) {
    if(gpsInfo.GPSLatitude && gpsInfo.GPSLatitudeRef && gpsInfo.GPSLongitude && gpsInfo.GPSLongitudeRef) {
        const latitude = dmsToDecimal(gpsInfo.GPSLatitude, gpsInfo.GPSLatitudeRef);
        const longitude = dmsToDecimal(gpsInfo.GPSLongitude, gpsInfo.GPSLongitudeRef);
        const geojsonPoint = point([longitude, latitude]);
        return geojsonPoint;
    }

    return null;

}

function dmsToDecimal(latArray:number[], direction:string) {
    // Extracting the values from the array
    const degrees = latArray[0];
    const minutes = latArray[1];
    const seconds = latArray[2];

    // Converting DMS to decimal degrees
    let decimal = degrees + minutes / 60 + seconds / 3600;

    // Applying the direction
    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }

    return decimal;
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