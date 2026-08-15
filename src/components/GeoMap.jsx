import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const pinIcon = (active) =>
  L.divIcon({
    className: '',
    html: `<span class="marker-pin${active ? ' is-active' : ''}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

/** Recenters the map whenever the selected place changes, without remounting it. */
const FlyTo = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.whenReady(() => {
      map.flyTo([target.lat, target.lon], Math.max(map.getZoom(), 4), { duration: 0.8 });
    });
  }, [target, map]);
  return null;
};

const GeoMap = ({ places, activePlace, onSelectPlace }) => (
  <MapContainer
    center={[35, 15]}
    zoom={2.4}
    minZoom={2}
    worldCopyJump
    className="h-full w-full"
    attributionControl={false}
  >
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution="&copy; OpenStreetMap contributors &copy; CARTO"
    />
    {places.map((p) => (
      <Marker
        key={`${p.lat},${p.lon}`}
        position={[p.lat, p.lon]}
        icon={pinIcon(activePlace === `${p.lat},${p.lon}`)}
        eventHandlers={{ click: () => onSelectPlace(`${p.lat},${p.lon}`) }}
      >
        <Popup>
          <b>{p.place}</b>
          <br />
          {p.entries.length} {p.entries.length === 1 ? 'entry' : 'entries'}
        </Popup>
      </Marker>
    ))}
    <FlyTo target={places.find((pl) => `${pl.lat},${pl.lon}` === activePlace) ?? null} />
  </MapContainer>
);

export default GeoMap;
