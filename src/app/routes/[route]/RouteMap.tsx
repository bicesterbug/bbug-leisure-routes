"use client"

import { FeatureCollection, Point } from "geojson"
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet"
import { icon } from "leaflet"
import Image from "next/image"
import getBasePath from "@/data/getBasePath"
import ExportedImage from "next-image-export-optimizer"

export default function RouteMap({routeGeojson, photoCollection}:{routeGeojson:FeatureCollection, photoCollection:FeatureCollection<Point>}) {
    const basePath = getBasePath();
    return (
        <MapContainer style={{width:'100%', height:'600px'}} center={[51.912617, -1.151021]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON data={routeGeojson} />
                    {
                        photoCollection.features.map((photoPoint, i) => {
                            console.log("photo", photoPoint)
                            return (
                                <Marker 
                                key={i}
                                position={[photoPoint.geometry.coordinates[1], photoPoint.geometry.coordinates[0]]}
                                icon={icon({
                                    iconUrl:`${basePath}/marker-icon.png`,
                                    iconAnchor:[12, 41]
                                })}
                                >
                                    <Popup>
                                        <ExportedImage alt={photoPoint.properties?.path} src={`${basePath}${photoPoint.properties?.path}`} width={500} height={500} />
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>
    )
}

