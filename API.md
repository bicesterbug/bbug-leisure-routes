The API is statically built via GitHub Actions, all requests are `GET` only.

### BaseURL
All requests should use the BaseURL + the endpoint.
`https://bicesterbug.github.io/bbug-leisure-routes`

### Types

```
RouteMetadata = {
    key: string;
    id: string;
    name: string;
    level: "easy"|"intermediate"|"difficult";
}
```

### Endpoints

#### Route List
GET `/api/data`

Returns: Array<RouteMetadata>

#### Route Metadata
GET `/api/routes/<ROUTE_ID>/data`

Returns: RouteMetadata

#### Route Photos
GET `/api/routes/<ROUTE_ID>/data`

Returns: 
```
{
  photos: string[]; // Photo file paths
  features: FeatureCollection<Point>; //Point features with path as property
}
```

#### Route GeoJSON
GET `/api/routes/<ROUTE_ID>/route.geojson`

returns: FeatureCollection<LineString>


#### Route GPX
GET `/api/routes/<ROUTE_ID>/route.gpx`

returns: GPX File