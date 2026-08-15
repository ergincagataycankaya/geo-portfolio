import { categoryColors } from '../data';

const filters = [
  { key: 'all', label: 'All', dot: '#8b98a5' },
  { key: 'education', label: 'Education', dot: categoryColors.education },
  { key: 'experience', label: 'Experience', dot: categoryColors.experience },
];

const Dot = ({ color }) => (
  <span className="inline-block size-1.5 shrink-0 rounded-full" style={{ background: color }} />
);

const FilterButton = ({ item, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`label flex items-center justify-center gap-2 rounded-md border py-2.5 transition ${
      active
        ? 'border-ink-300 bg-ink-600 text-sand'
        : 'border-ink-400 bg-ink-700 text-dim hover:border-ink-300 hover:text-muted'
    }`}
  >
    <Dot color={item.dot} />
    {item.label}
  </button>
);

const Stat = ({ value, label }) => (
  <div className="flex items-baseline gap-2 rounded-md border border-ink-400 bg-ink-700 px-3 py-2.5">
    <span className="font-mono text-base text-sand">{value}</span>
    <span className="label text-dim">{label}</span>
  </div>
);

const EntryCard = ({ entry, active, onClick }) => {
  const color = categoryColors[entry.category];
  return (
    <button
      type="button"
      onClick={onClick}
      style={active ? { borderColor: color } : undefined}
      className={`flex w-full items-start gap-3 rounded-md border p-3 text-left transition ${
        active ? 'bg-ink-600' : 'border-ink-400 bg-ink-700 hover:border-ink-300 hover:bg-ink-600'
      }`}
    >
      <span
        className="label grid size-10 shrink-0 place-items-center rounded border text-[9px] tracking-normal"
        style={{ borderColor: `${color}55`, color, background: `${color}12` }}
      >
        {entry.mono}
      </span>
      <span className="min-w-0 flex-1">
        <span className="label block text-sand">{entry.org}</span>
        <span className="mt-1 block font-serif text-sm italic leading-snug text-muted">
          {entry.meta} · {entry.title}
        </span>
      </span>
    </button>
  );
};

const Sidebar = ({ profile, entries, totalCount, countryCount, filter, onFilter, activeId, onSelectEntry }) => (
  <aside className="scroll-thin flex flex-col gap-7 border-ink-400 bg-ink-800 p-5 md:h-full md:overflow-y-auto md:border-r md:p-7">
    <a
      href={profile.homeUrl}
      className="label inline-flex items-center gap-2 text-dim transition hover:text-sand"
    >
      ← My portfolio
    </a>

    <div>
      <span className="label inline-flex items-center gap-2 rounded-md border border-ink-400 bg-ink-700 px-3 py-2 text-muted">
        <Dot color={categoryColors.experience} />
        Experience &amp; education
      </span>
      <h1 className="mt-5 font-serif text-4xl leading-[1.15] text-sand">
        Professional journey,
        <br />
        mapped.
      </h1>
      <p className="mt-4 font-serif text-[0.95rem] italic leading-relaxed text-muted">{profile.blurb}</p>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <Stat value={totalCount} label="entries" />
      <Stat value={countryCount} label="countries" />
    </div>

    <div>
      <p className="label mb-3 text-dim">Filter by category</p>
      <div className="grid gap-2">
        <FilterButton item={filters[0]} active={filter === 'all'} onClick={() => onFilter('all')} />
        <div className="grid grid-cols-2 gap-2">
          {filters.slice(1).map((f) => (
            <FilterButton key={f.key} item={f} active={filter === f.key} onClick={() => onFilter(f.key)} />
          ))}
        </div>
      </div>
    </div>

    <div className="flex-1">
      <p className="label mb-3 text-dim">Career timeline</p>
      <ul className="flex flex-col gap-2">
        {entries.map((e) => (
          <li key={e.id}>
            <EntryCard entry={e} active={activeId === e.id} onClick={() => onSelectEntry(e)} />
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default Sidebar;
