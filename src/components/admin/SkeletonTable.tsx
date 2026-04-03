export default function SkeletonTable({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
      <div className="border-b border-slate-200 px-5 py-4 flex gap-4">
        <div className="h-4 bg-slate-200 rounded w-32" />
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-4 bg-slate-200 rounded w-20 ml-auto" />
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <div className="h-3 bg-slate-200 rounded w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-slate-100">
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <div className={`h-4 bg-slate-100 rounded ${j === 0 ? "w-36" : j === cols - 1 ? "w-16" : "w-24"}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
