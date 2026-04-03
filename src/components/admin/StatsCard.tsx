import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "yellow" | "green" | "blue" | "red" | "slate";
  trend?: { value: number; label: string };
};

const colorMap = {
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  green: "bg-green-50 text-green-600 border-green-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  red: "bg-red-50 text-red-600 border-red-100",
  slate: "bg-slate-50 text-slate-600 border-slate-100",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "slate",
  trend,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-slate-900 text-3xl font-black">{value}</p>
      {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span className={trend.value >= 0 ? "text-green-500" : "text-red-500"}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-slate-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="w-8 h-8 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-8 bg-slate-200 rounded w-16 mb-1" />
      <div className="h-3 bg-slate-100 rounded w-28" />
    </div>
  );
}
