import type { FilterPreset } from "@/hooks/useDateFilter";

interface QuickFilterProps {
  preset: FilterPreset;
  onChange: (preset: FilterPreset) => void;
}

const presets: Array<{ id: FilterPreset; label: string }> = [
  { id: "all", label: "ทั้งหมด" },
  { id: "today", label: "วันนี้" },
  { id: "7days", label: "7 วัน" },
  { id: "30days", label: "30 วัน" },
  { id: "thisMonth", label: "เดือนนี้" },
  { id: "thisYear", label: "ปีนี้" },
  { id: "custom", label: "กำหนดเอง" },
];

export function QuickFilter({ preset, onChange }: QuickFilterProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            preset === p.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-accent"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}