import { useCallback, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Pane, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { categoryColors } from '../data';

const WORLD_VIEW = { center: [30, -10], zoom: 3 };

/** Classic teardrop pin, tinted by the category it represents. */
const pinIcon = (color, active) =>
  L.divIcon({
    className: '',
    html: `<svg class="pin${active ? ' is-active' : ''}" style="color:${color}" width="26" height="38" viewBox="0 0 27 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 0C6 0 0 6 0 13.5 0 23 13.5 41 13.5 41S27 23 27 13.5C27 6 21 0 13.5 0z" fill="${color}"/>
      <circle cx="13.5" cy="13.5" r="5.5" fill="#0d1117"/>
    </svg>`,
    iconSize: [26, 38],
    iconAnchor: [13, 38],
    popupAnchor: [0, -34],
  });

/** Recenters the map whenever the selected place changes, without remounting it. */
const FlyTo = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.whenReady(() => {
      map.flyTo([target.lat, target.lon], Math.max(map.getZoom(), 5), { duration: 0.9 });
    });
  }, [target, map]);
  return null;
};

/** Sits under Leaflet's own zoom stack and returns the map to the world view. */
const ResetViewButton = () => {
  const map = useMap();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
  }, []);

  const reset = useCallback(() => {
    map.flyTo(WORLD_VIEW.center, WORLD_VIEW.zoom, { duration: 0.9 });
  }, [map]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={reset}
      title="Reset view"
      aria-label="Reset view"
      className="map-btn absolute right-[10px] top-[82px] z-[1000] cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
      </svg>
    </button>
  );
};

const GeoMap = ({ places, activeKey, onSelectPlace }) => (
  <MapContainer
    center={WORLD_VIEW.center}
    zoom={WORLD_VIEW.zoom}
    minZoom={2}
    worldCopyJump
    zoomControl={false}
    className="h-full w-full"
  >
    <ZoomControl position="topright" />
    {/* Imagery is darkened by CSS; labels ride in a pane above so they stay crisp. */}
    <Pane name="imagery" className="leaflet-imagery-pane" style={{ zIndex: 200 }}>
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; Esri, Maxar, Earthstar Geographics"
        maxZoom={18}
      />
    </Pane>
    <Pane name="labels" style={{ zIndex: 250 }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap &copy; CARTO"
        maxZoom={18}
      />
    </Pane>

    {places.map((p) => {
      const color = categoryColors[p.entries[0].category];
      return (
        <Marker
          key={p.key}
          position={[p.lat, p.lon]}
          icon={pinIcon(color, activeKey === p.key)}
          eventHandlers={{ click: () => onSelectPlace(p.key) }}
        >
          <Popup>
            {p.place} · {p.entries.length} {p.entries.length === 1 ? 'entry' : 'entries'}
          </Popup>
        </Marker>
      );
    })}

    <FlyTo target={places.find((p) => p.key === activeKey) ?? null} />
    <ResetViewButton />
  </MapContainer>
);

export default GeoMap;
