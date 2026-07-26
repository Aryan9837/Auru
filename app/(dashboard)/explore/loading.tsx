export default function ExploreLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="h-10 w-32 bg-surface-alt rounded-[var(--radius-sm)] animate-pulse mb-2" />
          <div className="h-5 w-48 bg-surface-alt rounded-[var(--radius-sm)] animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-surface-alt rounded-[var(--radius)] animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
