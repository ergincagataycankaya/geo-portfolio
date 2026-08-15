import { categoryColors } from '../data';

const DetailPanel = ({ entry, onClose }) => {
  if (!entry) return null;
  const color = categoryColors[entry.category];

  return (
    <div className="pointer-events-auto absolute bottom-5 left-1/2 z-[1000] w-[min(30rem,calc(100%-2.5rem))] -translate-x-1/2 rounded-lg border border-ink-400 bg-ink-800/95 p-5 shadow-2xl backdrop-blur-md">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close details"
        className="absolute right-4 top-4 cursor-pointer text-lg leading-none text-dim transition hover:text-sand"
      >
        ×
      </button>

      <span
        className="label inline-flex items-center gap-2 rounded border px-2 py-1"
        style={{ borderColor: `${color}55`, color, background: `${color}12` }}
      >
        <span className="inline-block size-1.5 rounded-full" style={{ background: color }} />
        {entry.category}
      </span>

      <h2 className="mt-3 pr-6 font-serif text-xl leading-tight text-sand">{entry.title}</h2>
      <p className="label mt-2 text-muted">{entry.org}</p>
      <p className="mt-1 font-serif text-sm italic text-dim">
        {entry.meta} · {entry.place}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{entry.body}</p>
    </div>
  );
};

export default DetailPanel;
