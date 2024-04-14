import { Feature, Point } from "geojson";

export type RouteMetadata = {
    key: string;
    id: string;
    name: string;
    description: string;
    level: "easy"|"intermediate"|"difficult";
    waypoints: {point: Feature<Point>, description:string}[];
}