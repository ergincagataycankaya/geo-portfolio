const categories = [
  { key: 'all', label: 'All' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
];

const Sidebar = ({ profile, entries, filter, onFilter, activeId, onSelectEntry }) => (
  <aside className="flex h-full flex-col gap-6 overflow-y-auto border-r border-ink-400 bg-ink-800 p-6">
    <div>
      <a href="/" className="text-sm text-dim hover:text-amber">
        {profile.name}
      </a>
      <p className="mt-1 text-xs uppercase tracking-wide text-dim">Experience &amp; education</p>
      <h1 className="mt-3 font-serif text-2xl text-sand">Professional journey, mapped.</h1>
      <p className="mt-2 text-sm text-muted">{profile.blurb}</p>
    </div>

    <div className="flex items-center gap-4 text-xs text-dim">
      <span>
        <b className="text-sand">{entries.length}</b> portfolio entries
      </span>
      <span>
        <b className="text-sand">2</b> categories
      </span>
    </div>

    <div>
      <p className="mb-2 text-xs uppercase tracking-wide text-dim">Filter by category</p>
      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onFilter(c.key)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              filter === c.key
                ? 'border-amber bg-amber/10 text-amber'
                : 'border-ink-400 text-dim hover:border-ink-300 hover:text-sand'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>

    <div className="flex-1">
      <p className="mb-2 text-xs uppercase tracking-wide text-dim">Career timeline</p>
      <ul className="flex flex-col gap-2">
        {entries.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              onClick={() => onSelectEntry(e)}
              className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                activeId === e.id
                  ? 'border-amber bg-amber/10'
                  : 'border-ink-400 bg-ink-700 hover:border-ink-300 hover:bg-ink-600'
              }`}
            >
              <span className="block text-sm font-medium text-sand">{e.title}</span>
              <span className="block text-xs text-muted">{e.org}</span>
              <span className="block text-xs text-dim">
                {e.meta} · {e.place}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default Sidebar;
