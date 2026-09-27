# geo-portfolio

An interactive map-based portfolio — click a marker or a timeline entry to see the
role or degree behind it. Built with React, Vite, Tailwind CSS and Leaflet.

**Live:** [geo-portfolio-one.vercel.app](https://geo-portfolio-one.vercel.app/) ·
linked from [ergin.ca](https://ergin.ca)

Inspired by [noahweidig.com/geo-portfolio](https://noahweidig.com/geo-portfolio/).

## Development

```bash
npm install
npm run dev
```

The dev server uses port 5173, or `PORT` if it is set.

## Build

```bash
npm run build
```

## Content

All career and education entries live in [`src/data.js`](src/data.js), each tied to
a latitude/longitude. Edit that file to add, remove or update entries.

## Basemap

The map uses keyless Esri tile services, so no API key or environment variable is
needed:

- **Imagery:** `World_Imagery`, darkened with a CSS filter (`.leaflet-imagery-pane`
  in [`src/index.css`](src/index.css)).
- **Labels and borders:** `Reference/World_Boundaries_and_Places`.

Sources are defined in `TILE_SOURCES` in
[`src/components/GeoMap.jsx`](src/components/GeoMap.jsx). Each layer lists a mirror
host, and `FallbackTileLayer` switches to it after repeated tile errors.

Only add tile providers that work without a key. CARTO's basemaps used to, but now
stamp "API KEY REQUIRED" on every tile. Those tiles still load successfully, so the
fallback cannot detect them.

## Deployment

Vercel deploys every push to `main` to production. Pushes to other branches get
preview deployments.
