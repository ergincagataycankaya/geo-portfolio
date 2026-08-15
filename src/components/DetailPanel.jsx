const DetailPanel = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-[1000] max-w-md rounded-xl border border-ink-400 bg-ink-800/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:right-auto">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 text-dim hover:text-sand"
      >
        ✕
      </button>
      <p className="text-xs uppercase tracking-wide text-amber">
        {entry.category === 'education' ? 'Education' : 'Experience'}
      </p>
      <h2 className="mt-1 font-serif text-lg text-sand">{entry.title}</h2>
      <p className="text-sm text-muted">
        {entry.org} · {entry.place}
      </p>
      <p className="text-xs text-dim">{entry.meta}</p>
      <p className="mt-3 text-sm text-muted">{entry.body}</p>
    </div>
  );
};

export default DetailPanel;
