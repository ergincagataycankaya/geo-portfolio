import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import GeoMap from './components/GeoMap';
import DetailPanel from './components/DetailPanel';
import { profile, entries, places, countryCount } from './data';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [activeEntry, setActiveEntry] = useState(null);

  const filteredEntries = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.category === filter)),
    [filter],
  );

  /* One pin per location, keeping only the entries the current filter allows —
     Edmonton holds both a degree and a role, so it survives either filter. */
  const visiblePlaces = useMemo(() => {
    const visible = new Set(filteredEntries.map((e) => e.id));
    return places.flatMap((p) => {
      const kept = p.entries.filter((e) => visible.has(e.id));
      if (!kept.length) return [];
      return [{ ...p, entries: kept }];
    });
  }, [filteredEntries]);

  const handleSelectPlace = (key) => {
    const place = visiblePlaces.find((p) => p.key === key);
    if (place) setActiveEntry(place.entries[0]);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:h-screen md:grid-cols-[400px_1fr]">
      <Sidebar
        profile={profile}
        entries={filteredEntries}
        totalCount={entries.length}
        countryCount={countryCount}
        filter={filter}
        onFilter={(f) => {
          setFilter(f);
          setActiveEntry(null);
        }}
        activeId={activeEntry?.id}
        onSelectEntry={setActiveEntry}
      />

      {/* On phones the map leads and stays pinned while the timeline scrolls under it. */}
      <main className="sticky top-0 z-10 order-first h-[55vh] md:static md:order-none md:h-full">
        <GeoMap
          places={visiblePlaces}
          activeKey={activeEntry ? `${activeEntry.lat},${activeEntry.lon}` : null}
          onSelectPlace={handleSelectPlace}
        />

        {!activeEntry && (
          <div className="label pointer-events-none absolute bottom-6 left-1/2 z-[1000] -translate-x-1/2 rounded-md border border-ink-400 bg-ink-800/90 px-4 py-2.5 text-dim backdrop-blur-md">
            Click a marker to open details
          </div>
        )}

        <DetailPanel entry={activeEntry} onClose={() => setActiveEntry(null)} />
      </main>
    </div>
  );
};

export default App;
