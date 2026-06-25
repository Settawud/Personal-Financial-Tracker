interface DateRangePickerProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function DateRangePicker({ from, to, onFromChange, onToChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <label htmlFor="filter-from" className="block text-xs text-muted-foreground mb-1">ตั้งแต่</label>
        <input
          id="filter-from"
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          className="rounded-md border border-input px-2 py-1.5 text-sm"
        />
      </div>
      <div>
        <label htmlFor="filter-to" className="block text-xs text-muted-foreground mb-1">ถึง</label>
        <input
          id="filter-to"
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className="rounded-md border border-input px-2 py-1.5 text-sm"
        />
      </div>
    </div>
  );
}