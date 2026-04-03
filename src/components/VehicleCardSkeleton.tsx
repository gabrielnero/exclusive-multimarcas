export default function VehicleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow border border-zinc-100 animate-pulse">
      <div className="h-52 bg-zinc-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-zinc-200 rounded w-1/3" />
        <div className="h-5 bg-zinc-200 rounded w-2/3" />
        <div className="flex gap-3">
          <div className="h-3 bg-zinc-200 rounded w-16" />
          <div className="h-3 bg-zinc-200 rounded w-20" />
          <div className="h-3 bg-zinc-200 rounded w-14" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div>
            <div className="h-3 bg-zinc-200 rounded w-16 mb-1" />
            <div className="h-7 bg-zinc-200 rounded w-28" />
          </div>
          <div className="h-8 bg-zinc-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
