import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import GeoMap from './components/GeoMap';
import DetailPanel from './components/DetailPanel';
import { profile, entries, places } from './data';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [activeEntry, setActiveEntry] = useState(null);

  const filteredEntries = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.category === filter)),
    [filter],
  );

  const visiblePlaces = useMemo(() => {
    const visibleIds = new Set(filteredEntries.map((e) => e.id));
    return places
      .map((p) => ({ ...p, entries: p.entries.filter((e) => visibleIds.has(e.id)) }))
      .filter((p) => p.entries.length > 0);
  }, [filteredEntries]);

  const activePlace = activeEntry ? `${activeEntry.lat},${activeEntry.lon}` : null;

  const handleSelectPlace = (key) => {
    const place = places.find((p) => `${p.lat},${p.lon}` === key);
    const entry = place?.entries.find((e) => filteredEntries.some((fe) => fe.id === e.id)) ?? place?.entries[0];
    setActiveEntry(entry ?? null);
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[360px_1fr]">
      <Sidebar
        profile={profile}
        entries={filteredEntries}
        filter={filter}
        onFilter={(f) => {
          setFilter(f);
          setActiveEntry(null);
        }}
        activeId={activeEntry?.id}
        onSelectEntry={setActiveEntry}
      />
      <main className="relative h-full min-h-[50vh]">
        <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-full border border-ink-400 bg-ink-800/90 px-3 py-1 text-xs text-dim backdrop-blur">
          Click a marker to open details
        </div>
        <GeoMap places={visiblePlaces} activePlace={activePlace} onSelectPlace={handleSelectPlace} />
        <DetailPanel entry={activeEntry} onClose={() => setActiveEntry(null)} />
      </main>
    </div>
  );
};

export default App;
